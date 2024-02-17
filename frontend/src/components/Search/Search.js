import React, {useState} from 'react';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme.jsx'; 
import axios from 'axios'
import { useThemeVariants } from '@mui/styles';

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

      const pathCoords = response.data;
      console.log("pathCoords");
      console.log(pathCoords);
      const pathResponse = await axios({
        method: "GET",
        url: "/map/temp",
        params: {
          start: pathCoords.start,
          end: pathCoords.end
        }
      });

      console.log(await pathResponse.data); // contains all the 

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
      <InputLabel></InputLabel>
        <TextField id="location" label="Starting Location" variant='filled' sx={{}} onChange={(e) => setStartLocation(e.target.value)}/>

        <InputLabel></InputLabel>
        <TextField id="destination" label="Destination"  onChange={(e) => setDestination(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
    </ThemeProvider>
  );
}


export default Search;
