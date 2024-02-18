import * as React from 'react';
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
        <Box sx={{ p: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{fontSize:'1.1em'}}>Home</Typography>
          <HomeIcon sx={{fontSize: 60}} />
        </Box>
        {/* Work icon and label */}
        <Box sx={{ p: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{fontSize:'1.1em'}}>Work</Typography>
          <WorkIcon sx={{fontSize: 60}}/>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

const cardHist = (
  <React.Fragment>
    <CardContent>
    <Typography sx={{color: 'text.primary', fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}> History </Typography>
      <Box>
        <Typography>Toronto Public Library - York Woods Branch</Typography>
        <Typography>Address: 1785 Finch Ave W, Toronto, ON M3N 1M6</Typography>
        <hr/>
      </Box>
      <Box>
        <Typography>York University</Typography>
        <Typography>Address: 4700 Keele St, Toronto, ON M3J 1P3</Typography>
        <hr/>
      </Box>
      <Box>
        <Typography>Toronto Public Library - York Woods Branch</Typography>
        <Typography>Address: 1785 Finch Ave W, Toronto, ON M3N 1M6</Typography>
        <hr/>
      </Box>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{cardFave}</Card>
      <br/>
      <Card variant="outlined">{cardHist}</Card>
    </Box>
  );
}
