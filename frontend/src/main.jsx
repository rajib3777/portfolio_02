import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeQueryProvider } from './providers/ThemeQueryProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeQueryProvider>
      <App />
    </ThemeQueryProvider>
  </React.StrictMode>
);
