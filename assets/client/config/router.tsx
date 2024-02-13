import { createBrowserRouter, RouteObject } from 'react-router-dom';
import StartPage from '@/client/components/StartPage';
import React from 'react';
import UserDashboard from '@/client/components/user/UserDashboard';
import AccountDashboard from '@/client/components/account/AccountDashboard';
import AccountBalance from '@/client/components/account/AccountBalance';
import AccountHistory from '@/client/components/account/AccountHistory';

export type RouteKey =
  | 'home'
  | 'dashboard'
  | 'accounts_dashboard'
  | 'accounts_balance'
  | 'accounts_history'
  | 'accounts_plan';

export const routes: RouteObject[] = [
  {
    id: 'home' as RouteKey,
    path: '/',
    element: <StartPage />,
  },
  {
    id: 'dashboard' as RouteKey,
    path: '/dashboard',
    element: <UserDashboard />,
  },
  // TODO Differentiate if a User or an Account holder view an account
  {
    path: '/accounts/:id/',
    id: 'accounts_dashboard' as RouteKey,
    element: <AccountDashboard />,
  },
  {
    path: '/accounts/:id/balance',
    id: 'accounts_balance' as RouteKey,
    element: <AccountBalance />,
  },
  {
    path: '/accounts/:id/history',
    id: 'accounts_history' as RouteKey,
    element: <AccountHistory />,
  },
  {
    path: '/accounts/:id/history',
    id: 'accounts_plan' as RouteKey,
    element: <Account />,
  },
];

export const router = createBrowserRouter(routes);
