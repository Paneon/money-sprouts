import { createBrowserRouter } from 'react-router-dom';
import StartPage from '@/client/routes/StartPage';
import React from 'react';
import AccountSelectionPage from '@/client/routes/AccountSelectionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/accountselection2',
    element: <AccountSelectionPage />,
  },
]);
