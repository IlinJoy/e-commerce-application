import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { responseTheme } from './theme/theme.ts';
import { ThemeAppProvider } from './theme/provider/theme-provider.tsx';
import { App } from './App.tsx';
import './styles/global.scss';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(
  <StrictMode>
    <ThemeAppProvider theme={responseTheme}>
      <App />
    </ThemeAppProvider>
  </StrictMode>
);
