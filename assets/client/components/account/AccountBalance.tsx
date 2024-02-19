import AccountLayout from '@/client/layouts/AccountLayout';
import { useTranslation } from 'react-i18next';
import { Account } from '@/client/interfaces/Account';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Loading from '@/client/components/Loading';
import useFunnyImage from '@/client/hooks/useFunnyImage';
import { formatCentsToEuro } from '@/client/utils/currency';
import './AccountBalance.scss';
import {
  getDaysUntilNextPayday,
  getFormattedNextPayday,
} from '@/client/utils/date';
import { Locale } from '@/client/interfaces/Locale';
import { pathToRoute } from '@/client/utils/pathToRoute';
import { useAccountStore } from '@/client/store/useAccountStore';

interface Props {
  account: Account;
}

function AccountBalanceView({ account }: Props) {
  const { t, i18n } = useTranslation();

  const { imagePath } = useFunnyImage(account?.balance);

  const nextPayday = account.nextPayday
    ? getFormattedNextPayday(account.nextPayday, i18n.language as Locale)
    : null;
  const daysUntilNextPayday = account.nextPayday
    ? getDaysUntilNextPayday(account.nextPayday)
    : null;

  return (
    <div className="custom-text-box">
      {account.balance && (
        <div className="balance-display">
          {formatCentsToEuro(account.balance)}
        </div>
      )}

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
  );
}

export default function AccountBalance() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, isLoading, fetchData } = useAccountStore();

  const fetchDataRef = useRef(fetchData);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchDataRef.current(id);
  }, [id]);

  if (!id) {
    navigate(pathToRoute('dashboard'));
    return;
  }

  return (
    <AccountLayout
      title={t('PAGE_HEADER.PAGE_NAME.OVERVIEW')}
      backTo={pathToRoute('accounts_dashboard', { id })}
    >
      <div className="custom-container no-transparency">
        {isLoading && <Loading />}
        {!isLoading && id && account && (
          <AccountBalanceView account={account} />
        )}
      </div>
    </AccountLayout>
  );
}
