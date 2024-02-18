import React, { useState } from 'react';
import { Button } from '@mui/material';
import SearchBar from './SearchBar'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Theme.jsx';
import axios from 'axios'
import Map from '../Map/Map.js';

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
          <SearchBar
            onSearchResult={(e) => setStartLocation(e)}
            searchLabel="Starting Location"
            sx={{backgroundColor: 'background.paper'}}
          />
          <br></br>
          <SearchBar
            onSearchResult={(e) => setDestination(e)}
            searchLabel="Destination"
            sx={{backgroundColor: 'background.paper'}}
          />
          <br></br>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}


export default Search;
