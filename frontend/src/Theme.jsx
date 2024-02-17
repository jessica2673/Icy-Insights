import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#383F51',
    },
    secondary: {
      main: '#DDDBF1',
    },
    error: {
      main: '#3C4F76',
    },
    success: {
      main: '#419D78',
    },
    warning: {
      main: '#BFCC94',
    },
    background: {
      default: '#DDDBF1',
    },
  },
  typography: {
    fontWeightBold: 700, // Example property
   
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
  // You can also customize components, typography, etc., here
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;