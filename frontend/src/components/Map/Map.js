import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
const keys = require('../../../../backend/config/keys.js');

//const libraries = [];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 43.7723504, // default latitude
  lng: -79.5068685, // default longitude
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: keys.maps.mapsAPI,
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
        center={center}
      >
        <MarkerF position={{lat: 43.7723504, lng: -79.5068685}} />
      </GoogleMap>
    </div>
  );
  }


export default Map;
