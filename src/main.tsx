import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router';
import './styles/global.scss';
import { ToastContextProvider } from './context/toast-provider.tsx';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </BrowserRouter>
  </StrictMode>
);
