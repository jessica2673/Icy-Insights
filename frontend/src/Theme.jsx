import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { InputLabel, TextField } from '@mui/material';

// Define a theme
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
  },
  components: {
    // Customizing InputLabel globally
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Define your styles here
          fontSize: '1rem',
          color: 'rgba(0, 0, 0, 0.6)', // Example style
        },
      },
    },
    // Customizing TextField globally
    MuiTextField: {
      defaultProps: {
        // Default props here
        variant: 'filled', // This sets the variant globally, if you want
      },
      styleOverrides: {
        root: {
          // Styles applied to the root element
        },
      },
    },
    // Since TextField uses the Input component under the hood for the "filled" variant,
    // you might want to customize MuiFilledInput specifically for your TextFields
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // Specific styles for filled variant
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  },

});

export default theme;


// Define styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: 20,
    margin: 10,
  },
}));

// Component using the styles
const MyComponent = () => {
  const classes = useStyles();

  return <div className={classes.root}>Styled with MUI</div>;
};

// App component with ThemeProvider
function App() {
  return (
    <ThemeProvider theme={theme}>
      <InputLabel/>
      <TextField/>
    </ThemeProvider>
  );
}


//const theme = createTheme({
  

//const Theme = ({ children }) => (
//  <ThemeProvider theme={theme}>{children}</ThemeProvider>
//);

//export default Theme;