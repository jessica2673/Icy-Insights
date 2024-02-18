import React, { useState } from 'react';
import { Button } from '@mui/material';
import SearchBar from './SearchBar'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme.jsx';
import axios from 'axios'
import { Box } from '@mui/material';

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
      <Box 
        sx={{
          display: 'flex', // Use flex layout
          flexDirection: 'column', // Stack children vertically
          alignItems: 'center', // Center items horizontally in the container
          width: '100%', // Container takes full width
        }}
      >
        <form 
          encType="multipart/form-data" 
          action="/snow/paths" 
          method="POST" 
          onSubmit={handleSubmit}
          style={{
            display: 'flex', 
            flexDirection: 'column', // Stack form elements vertically
            alignItems: 'center', // Center form elements horizontally
            width: '100%', // Form takes full width of its container
          }}
        >
          <SearchBar
            onSearchResult={(e) => setStartLocation(e)}
            searchLabel="Starting Location"
          />
          
          <SearchBar
            onSearchResult={(e) => setDestination(e)}
            searchLabel="Destination"
          />
          
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Find Route
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default Search;