import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          backgroundImage: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: 'var(--mui-palette-grey-900)',
          borderRadius: 'var(--border-radius-2)',
          padding: 'var(--spacing-4)',
          maxWidth: '500px',
        },
      },
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
