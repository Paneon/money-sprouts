import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/client/config/router';

export default function App() {
  return <RouterProvider router={router} />;
}
