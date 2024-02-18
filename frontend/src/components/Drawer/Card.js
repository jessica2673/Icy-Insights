import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { Typography } from '@mui/material/';
import { alignProperty } from '@mui/material/styles/cssUtils';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardFave = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ color: 'text.primary', fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em' }}> Favourites </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-around', // Adjust this as needed
        alignItems: 'center', // This will vertically center the items if needed
        width: '100%',
  
      }}>
        {/* Home icon and label */}
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography sx={{fontSize:'1.1em'}}>Home</Typography>
          <HomeIcon sx={{fontSize: 60}} />
          <Typography>257 Cook Rd, Toronto, ON M3J 3T1</Typography>
        </Box>
        {/* Work icon and label */}
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{fontSize:'1.1em'}}>Work</Typography>
          <WorkIcon sx={{fontSize: 60}}/>
          <Typography>121 Hidden Trail, Toronto, ON M2R 3S2</Typography>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

const CardHist = ({ history }) => {
  return (
    <React.Fragment>
      <CardContent>
      <Typography sx={{color: 'text.primary', fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}> Search History </Typography>
        {history.length > 0 ? (
          history.map((site, index) => (
            <Box key={index}>
              <Typography>Start location: {site.startLocation}</Typography>
              <Typography>Destination: {site.destination}</Typography>
              <hr />
            </Box>
          ))
        ) : (
          <Typography>No history found</Typography>
        )}
      </CardContent>
    </React.Fragment>
  );
};

export default function OutlinedCard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory"); // searchHistory is an array of strings
    if (searchHistory) {
      const storedHistory = JSON.parse(searchHistory);
      setHistory(storedHistory); // is an array
      console.log(storedHistory);
    }
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{cardFave}</Card>
      <br/>
      <Card variant="outlined">
        <CardHist history={history} />
      </Card>
    </Box>
  );
}
