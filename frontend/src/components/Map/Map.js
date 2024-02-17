import React from 'react';
import { useState } from 'react'; 
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';


//const libraries = ['routes'];
const mapContainerStyle = {
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  bottom: "0px"
};


const Map = () => {

  const [location, setLocation] = useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(latitude, longitude);
    console.log(location);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_MAPS_API_KEY
    //libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={location}
      >
        <MarkerF position={{location}} />
      </GoogleMap>
    </div>
  );
  }


export default Map;
