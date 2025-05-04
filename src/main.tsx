import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.module.css';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
