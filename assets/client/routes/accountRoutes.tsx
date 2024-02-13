import AccountDashboard from '@/client/components/account/AccountDashboard';
import AccountBalance from '@/client/components/account/AccountBalance';

const routes = [
  // {
  //   path: '/accounts/create',
  //   key: 'account_create',
  //   element: <AccountCreate />,
  // },
  // {
  //   path: '/accounts/edit/:id',
  //   key: 'accounts_update',
  //   element: <Update />,
  // },
  // TODO Differentiate if a User or an Account holder view an account
  {
    path: '/accounts/:id/',
    key: 'account_dashboard',
    element: <AccountDashboard />,
  },
  {
    path: '/accounts/:id/balance',
    key: 'accounts_balance',
    element: <AccountBalance />,
  },
];

export default routes;
