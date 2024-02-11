import '../styles/app.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '@/client/App';

const domNode = document.getElementById('reactApp');
if (domNode) {
  createRoot(domNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log('React Root not found.');
}
