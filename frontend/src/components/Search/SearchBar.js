import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { TextField } from '@mui/material';

const placesLibrary = ["places"];

function SearchBar({ onSearchResult, searchLabel }) {
  const [searchResult, setSearchResult] = useState("Result: none");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_MAPS_API_KEY,
    libraries: placesLibrary
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
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SearchBar">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <TextField
          label={searchLabel} // Use the received label prop
          variant="outlined"
        />
      </Autocomplete>
    </div>
  );
}

export default SearchBar;
