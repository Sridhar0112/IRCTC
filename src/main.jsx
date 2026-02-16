import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useTheme } from './hooks/useTheme';
import './index.css';
import { registerServiceWorker } from './utils/registerSW';

function Root() {
  useTheme();
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
