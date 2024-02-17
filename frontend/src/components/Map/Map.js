import React from 'react';
import { useState, useEffect } from 'react'; 
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

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    function success(position){
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocation({ lat, lng }); // Update state as an object
      console.log(typeof(location));
    }
  
    function error() {
      console.log("Unable to retrieve your location");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }, []); // Empty dependency array means this runs once on component mount

  

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
        <MarkerF position={location} />
      </GoogleMap>
    </div>
  );
  }


export default Map;
