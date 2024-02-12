import AccountDashboard from '@/client/components/account/AccountDashboard';

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
  // {
  //   path: '/accounts/show/:id',
  //   key: 'accounts_show',
  //   element: <AccountShow />,
  // },
  // TODO Differentiate if a User or an Account holder view an account
  {
    path: '/accounts/:id/',
    key: 'account_dashboard',
    element: <AccountDashboard />,
  },
];

export default routes;
