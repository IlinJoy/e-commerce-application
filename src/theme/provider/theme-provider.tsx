import type { Theme } from '@emotion/react';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

export function ThemeAppProvider({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
