import UserLayout from '@/client/layouts/UserLayout';
import { useTranslation } from 'react-i18next';
import AccountTile from '@/client/components/user/AccountTile';
import useApi from '@/client/hooks/useApi';
import { Account } from '@/client/interfaces/Account';

export default function UserDashboard() {
  const { t } = useTranslation();

  const { data: accounts, isLoading, error } = useApi<Account[]>('accounts');

  return (
    <UserLayout title={t('PAGE_HEADER.PAGE_NAME.ACCOUNT-SELECTION')}>
      <div className="custom-container no-transparency">
        {isLoading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {error}
          </div>
        )}
        <div className="button-container">
          {accounts &&
            accounts.map((account) => <AccountTile account={account} />)}
        </div>
      </div>
    </UserLayout>
  );
}
