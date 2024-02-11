import '../styles/app.scss';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '@/client/App';
import './config/i18n';

const domNode = document.getElementById('reactApp');

if (domNode) {
  createRoot(domNode).render(<App />);
} else {
  console.log('React Root not found.');
}
