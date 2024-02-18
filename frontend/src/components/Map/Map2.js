import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

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

class Map2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 40.756795, lng: -73.954298 }
    };
  }

  render() {
    const apiIsLoaded = (map, maps) => {
      const directionsService = new maps.DirectionsService();
      const directionsRenderer = new maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      const origin = { lat: 43.7731801, lng: -79.5019676 };
      const destination = { lat: 43.6684012, lng: -79.4096204 };

      directionsService.route( 
        {
          origin: origin,
          destination: destination,
          travelMode: maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };
    return (
      <div>
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAPS_API_KEY
            }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={10} 
            center={this.state.currentLocation}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            options={mapContainerStyle}
          />
        </div>
      </div>
    );
  }
}
export default Map2;
