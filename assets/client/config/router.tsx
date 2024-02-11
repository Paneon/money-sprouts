import { createBrowserRouter } from 'react-router-dom';
import StartPage from '@/client/routes/start';
import React from 'react';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <StartPage />,
    },
]);
