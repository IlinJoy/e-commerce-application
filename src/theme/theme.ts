import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-primary), var(--font-secondary), sans-serif',
    h1: { fontSize: '116px' },
    h2: { fontSize: '48px' },
    h5: { fontSize: '20px' },
  },

  palette: {
    mode: 'dark',
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'standard' },
    },
    MuiFormControl: {
      defaultProps: { variant: 'standard' },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('lg')]: {
            maxWidth: 'none',
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: '2000px',
          },
        }),
      },
    },
  },
});

export const responseTheme = responsiveFontSizes(theme);
