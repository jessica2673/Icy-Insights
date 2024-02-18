import React, {useState} from 'react';
import Map2 from '../../components/Map/Map2';
import Drawer from "../../components/Drawer/Drawer"
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [routesData, setRoutesData] = useState(null);
  const toSignIn = () => {
    navigate('/sign-in');
  };

  const handlePathData = (data) => {
    // Your implementation for handlePathData
    setRoutesData(data);
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton
        sx={{
          position: 'relative',
          pointerEvents: 'auto',
          top: 0,
          right: 0,
          margin: 3,
          zIndex: 500,
          width: '40px',
          height: '40px',
          float: 'left',
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
        onClick={toSignIn}
      >
        <AccountCircle fontSize="large" sx={{ color: 'secondary.main' }} />
      </IconButton>
      <Map2 routesData={routesData}/>
      <Drawer onPathData={handlePathData} />
    </ThemeProvider>
  );
}

export default Home;
