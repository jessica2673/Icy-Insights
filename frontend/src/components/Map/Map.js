import React from 'react';
import { useState, useEffect } from 'react'; 
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  position: "absolute",
  top: "15px",
  left: "15px",
  right: "15px",
  bottom: "56px",
  boxShadow: "1px 1px 10px 1px grey",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
};


const Map = () => {

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    function success(position){
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocation({ lat, lng }); // Update state as an object
      
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
    googleMapsApiKey:  process.env.REACT_APP_MAPS_API_KEY,
    libraries: ['places']
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
          options={{fullscreenControl: false}}
        >
          <MarkerF position={location} icon={"https://maps.google.com/mapfiles/ms/icons/blue-dot.png"}/>
        </GoogleMap>
     
    </div>
  );
  }


export default Map;
