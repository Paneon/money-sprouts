import AccountLayout from '@/client/layouts/AccountLayout';
import { useTranslation } from 'react-i18next';
import { redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/client/components/Loading';
import { pathToRoute } from '@/client/utils/pathToRoute';
import useTransactions from '@/client/hooks/useTransactions';
import { Transaction } from '@/client/interfaces/Transaction';
import { formatCentsToEuro } from '@/client/utils/currency';
import './AccountHistory.scss';

export default function AccountHistory() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  if (!id) {
    redirect(pathToRoute('dashboard'));
    return null;
  }

  const {
    data: transactionData,
    isLoading,
    getTransactions,
  } = useTransactions();
  const [earnings, setEarnings] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [maxLength, setMaxLength] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(5);

  useEffect(() => {
    getTransactions(id);
  }, []);

  useEffect(() => {
    if (!transactionData) {
      return;
    }

    const earns = transactionData.filter((i) => i.isEarning);
    const exps = transactionData.filter((i) => i.isExpense);
    const max = Math.max(earns.length, exps.length);
    setEarnings(earns);
    setExpenses(exps);
    setMaxLength(max);
    setShowMoreButton(displayedItems < max);
    setDisplayedItems(Math.min(max, displayedItems));
  }, [transactionData]);

  useEffect(() => {
    setShowMoreButton(displayedItems < maxLength);
  }, [displayedItems]);

  function cssClasses(t: Transaction | undefined) {
    if (!t) {
      return '';
    }

    if (t.applied) {
      return 'applied';
    } else {
      return 'not-applied';
    }
  }

  function showMore() {
    setDisplayedItems(displayedItems + 5);
  }

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.HISTORY')}
      backTo={pathToRoute('accounts_dashboard', { id })}
    >
      <div className="custom-container no-transparency">
        {isLoading && <Loading />}
        <div className="custom-table-button-grid">
          <table className="transaction-table">
            <thead>
              <tr>
                <th className="tablehead-image-wrapper">
                  <img src="/assets/images/money.png" alt="Income" />
                </th>
                <th className="tablehead-image-wrapper">
                  <img
                    src="/assets/images/shopping-card_small.png"
                    alt="Expenses"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(displayedItems)].map((_, index) => (
                <tr key={index}>
                  <td className={cssClasses(earnings[index])}>
                    {earnings[index]?.value ? (
                      <>
                        <span className="income-amount">
                          +{formatCentsToEuro(earnings[index].value!)}
                        </span>
                        <span className="transaction-title">
                          {earnings[index].title}
                        </span>
                      </>
                    ) : null}
                  </td>
                  <td className={cssClasses(earnings[index])}>
                    {expenses[index]?.value ? (
                      <>
                        <span className="expense-amount">
                          {formatCentsToEuro(expenses[index].value!)}
                        </span>
                        <span className="transaction-title">
                          {expenses[index].title}
                        </span>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMoreButton && (
            <div>
              <button
                onClick={() => showMore()}
                className="toggle-content-button"
              >
                <span>{t('HISTORY.SHOW_MORE')}</span>
                <img src="/assets/images/arrow-down_small.png" alt="Arrow" />
              </button>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}
