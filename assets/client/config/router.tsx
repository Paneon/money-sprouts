import { createBrowserRouter } from 'react-router-dom';
import StartPage from '@/client/components/StartPage';
import React from 'react';
import userRoutes from '@/client/routes/userRoutes';
import accountRoutes from '@/client/routes/accountRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  ...accountRoutes,
  ...userRoutes,
]);
