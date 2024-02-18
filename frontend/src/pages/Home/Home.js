import React from 'react';
import Map2 from '../../components/Map/Map2';
import Drawer from "../../components/Drawer/Drawer"
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const toSignIn = () => {
    navigate('/sign-in');
  };
  
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        sx={{
          position: 'absolute',
          pointerEvents: 'auto',
          top: 0,
          right: 0,
          margin: 3,
          zIndex: 500,
          width: '40px',
          height: '40px',
          borderRadius: '50%', 
          backgroundColor: 'white', 
        }}
        onClick={toSignIn}
      >
        <AccountCircle fontSize="large" sx={{color: 'secondary.main'}} />
      </IconButton>
      <Map2 />
      <Drawer />
    </ThemeProvider>
  );
}

export default Home;
