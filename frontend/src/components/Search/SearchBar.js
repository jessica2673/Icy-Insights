import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { TextField } from '@mui/material';
import { Box } from "@mui/material";
import './SearchBar.css'

function SearchBar({ onSearchResult, searchLabel }) {
  const [searchResult, setSearchResult] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_MAPS_API_KEY,
    libraries: ['places'],
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;

      // Emit the value to the parent component
      onSearchResult(formattedAddress);
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{
        display: 'flex', // Use flex layout
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center items horizontally in the container
        width: '100%', // Container takes full width
      }}>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} sx={{zIndex: 300000}}>
        <TextField
          label={searchLabel} // Use the received label prop
          variant="outlined"
          sx={{margin: 0.75, width: '300px'}}
        />
      </Autocomplete>
    </Box>
  );
}

export default SearchBar;
