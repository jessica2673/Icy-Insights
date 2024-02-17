import React, {useState} from 'react';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme.jsx'; 
import axios from 'axios'


const Search = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');

  const sendData = async (formData) => {
    formData.forEach((value, key) => { console.log(`${key}: ${value}`); });
    try {
      const response = await axios({
        method: "POST",
        url: "/snow/paths",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (await !response.ok) {
        console.log(response.error);
      }

      const pathCoords = response.data;
      console.log(pathCoords);
      const pathResponse = await axios({
        method: "GET",
        url: "/map/temp"
      });

      console.log(pathResponse);

      const response2 = await axios({
        method: "POST",
        url: "/map/computeDefaultRoutes",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("start", startLocation);
    formData.append("end", destination);
    
    await sendData(formData);
  }
  
  return (
    <ThemeProvider theme={theme}>
    <div className='search-container'>
      <form encType="multipart/form-data" action="/snow/paths" method="POST" onSubmit={handleSubmit}>
      
        <TextField id="location" label="Starting Location" variant='filled' sx={{backgroundColor: 'background.paper'}} onChange={(e) => setStartLocation(e.target.value)}/>

      
        <TextField id="destination" label="Destination" sx={{backgroundColor: 'background.paper'}} onChange={(e) => setDestination(e.target.value)}/>
        <button type="submit" sx={{backgroundColor: 'secondary.main'}}>Submit</button>
      </form>
    </div>
    </ThemeProvider>
  );
}


export default Search;
