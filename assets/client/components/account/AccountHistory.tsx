import AccountLayout from '@/client/layouts/AccountLayout';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/client/components/Loading';
import { pathToRoute } from '@/client/utils/pathToRoute';
import useTransactions from '@/client/hooks/useTransactions';
import { Transaction } from '@/client/interfaces/Transaction';
import { formatCentsToEuro } from '@/client/utils/currency';
import './AccountHistory.scss';
import clsx from 'clsx';

interface Props {
  transactions: Transaction[];
}

function TransactionEntry({ transaction }: { transaction: Transaction }) {
  return (
    <>
      <span className="transaction__amount">
        {transaction.value! > 0 ? '+' : ''}
        {formatCentsToEuro(transaction.value!)}
      </span>
      <span className="transaction__title">{transaction.title}</span>
    </>
  );
}

function AccountHistoryView({ transactions }: Props) {
  const { t } = useTranslation();

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(5);

  const earnings = transactions.filter((i) => i.isEarning);
  const expenses = transactions.filter((i) => i.isExpense);
  const max = Math.max(earnings.length, expenses.length);

  useEffect(() => {
    setShowMoreButton(displayedItems < max);
    setDisplayedItems(Math.min(max, displayedItems));
  }, [displayedItems, max]);

  function showMore() {
    setDisplayedItems(displayedItems + 5);
  }

  return (
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
              <td
                className={clsx({
                  transaction: true,
                  'transaction--inactive': !earnings[index].applied,
                })}
              >
                {earnings[index]?.value ? (
                  <TransactionEntry transaction={earnings[index]} />
                ) : null}
              </td>
              <td
                className={clsx({
                  transaction: true,
                  'transaction--expense': true,
                  'transaction--inactive': !expenses[index].applied,
                })}
              >
                {expenses[index]?.value ? (
                  <TransactionEntry transaction={expenses[index]} />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showMoreButton && (
        <div>
          <button onClick={() => showMore()} className="toggle-content-button">
            <span>{t('HISTORY.SHOW_MORE')}</span>
            <img src="/assets/images/arrow-down_small.png" alt="Arrow" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AccountHistory() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: transactions, isLoading, getTransactions } = useTransactions();

  const fetchTransactions = useRef(getTransactions);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchTransactions.current(id);
  }, [id]);

  if (!id) {
    navigate(pathToRoute('dashboard'));
    return;
  }

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.HISTORY')}
      backTo={pathToRoute('accounts_dashboard', { id })}
    >
      <div className="custom-container no-transparency">
        {isLoading && <Loading />}
        {!isLoading && transactions && (
          <AccountHistoryView transactions={transactions} />
        )}
      </div>
    </AccountLayout>
  );
}
