import React, { ReactElement, useEffect, useState } from 'react';
import AccountLayout from '@/client/layouts/AccountLayout';
import { pathToRoute } from '@/client/utils/pathToRoute';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useApi from '@/client/hooks/useApi';
import { Account } from '@/client/interfaces/Account';
import { formatCentsToEuro } from '@/client/utils/currency';
import clsx from 'clsx';
import PlanEarnings from '@/client/components/account/plan/PlanEarnings';
import PlanExpenses from '@/client/components/account/plan/PlanExpenses';
import './PlanPage.scss';
import { useAccountStore } from '@/client/store/useAccountStore';

export default function PlanPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data: account, fetchData } = useApi<Account>(`accounts/${id}`);
  const accountStore = useAccountStore();
  const [formattedBalance, setFormattedBalance] = useState<string | null>(null);
  const [tempBalance, setTempBalance] = useState<ReactElement | null>(null);
  const [activeTab, setActiveTab] = useState('spend');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!account) {
      return;
    }

    if (account.balance) {
      setFormattedBalance(formatCentsToEuro(account.balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, i18n.language]);

  function planExpense(costInCents: number) {
    const balance = accountStore.account?.balance ?? 0;
    const newBalance = balance - costInCents;

    setTempBalance(
      <>
        =&gt;{' '}
        <span className="text-danger">{formatCentsToEuro(newBalance)}</span>
      </>
    );
  }

  function planEarning(earnInCents: number | null) {
    if (earnInCents === null) {
      setTempBalance(null);
      return;
    }

    const balance = accountStore.account?.balance ?? 0;
    const newBalance = balance + earnInCents;

    setTempBalance(
      <>
        =&gt;{' '}
        <span className="text-success">{formatCentsToEuro(newBalance)}</span>
      </>
    );
  }

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.OVERVIEW')}
      backTo={pathToRoute('accounts_dashboard', { id })}
    >
      <div id="plan" className="custom-container">
        <div className="custom-text-box">
          <div className="balance-display">
            {formattedBalance} {tempBalance}
          </div>
          <div className="tabs">
            <div
              onClick={() => setActiveTab('spend')}
              className={clsx({ tab: true, active: activeTab === 'spend' })}
            >
              <img
                src="/assets/images/shopping-card_small.png"
                alt="spend-icon"
                className="tab-icon"
              />
              <span className="tab-title">{t('PLAN.TAB_SPENT.TITLE')}</span>
            </div>
            <div
              onClick={() => setActiveTab('earn')}
              className={clsx({ tab: true, active: activeTab === 'earn' })}
            >
              <img
                src="/assets/images/money.png"
                alt="earn-icon"
                className="tab-icon"
              />
              <span className="tab-title">{t('PLAN.TAB_EARN.TITLE')}</span>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === 'spend' ? (
              <PlanExpenses onCalculateExpense={(v) => planExpense(v)} />
            ) : null}
            {activeTab === 'earn' ? (
              <PlanEarnings onCalculateEarning={(y) => planEarning(y)} />
            ) : null}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
