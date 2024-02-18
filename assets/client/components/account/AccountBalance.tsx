import AccountLayout from '@/client/layouts/AccountLayout';
import { useTranslation } from 'react-i18next';
import useApi from '@/client/hooks/useApi';
import { Account } from '@/client/interfaces/Account';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/client/components/Loading';
import useFunnyImage from '@/client/hooks/useFunnyImage';
import { formatCentsToEuro } from '@/client/utils/currency';
import './AccountBalance.scss';
import {
  getDaysUntilNextPayday,
  getFormattedNextPayday,
} from '@/client/utils/date';
import { Locale } from '@/client/interfaces/Locale';

export default function AccountBalance() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const {
    data: account,
    isLoading,
    fetchData,
  } = useApi<Account>(`accounts/${id}`);
  const [balance, setBalance] = useState<string | null>(null);
  const { imagePath } = useFunnyImage(account?.balance);
  const [nextPayday, setNextPayday] = useState<string | null>(null);
  const [daysUntilNextPayday, setDaysUntilNextPayday] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!account) {
      return;
    }

    if (account.balance) {
      setBalance(formatCentsToEuro(account.balance));
    }

    if (account.nextPayday) {
      setNextPayday(
        getFormattedNextPayday(account.nextPayday!, i18n.language as Locale)
      );
      setDaysUntilNextPayday(getDaysUntilNextPayday(account.nextPayday!));
    }
  }, [account, i18n.language]);

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.OVERVIEW')}
      backTo={`/accounts/${id}`}
    >
      <div className="custom-container no-transparency">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="custom-text-box">
            {balance && <div className="balance-display">{balance}</div>}

            <div className="funny-image-wrapper">
              <figure>
                <img src={imagePath} alt="funny image" />
              </figure>
            </div>
            <div className="payday-info">
              <div>
                {t('OVERVIEW.PAYDAY_WEEKDAY_LABEL')}&nbsp;
                <span className="bold-text">
                  {nextPayday ?? t('OVERVIEW.PAYDAY_WEEKDAY_UNKNOWN')}
                </span>
              </div>
              <div>
                {t('OVERVIEW.PAYDAY_COUNTER_LABEL')}&nbsp;
                <span className="bold-text">
                  {daysUntilNextPayday ?? t('OVERVIEW.PAYDAY_COUNTER_UNKNOWN')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
