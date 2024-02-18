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
    this.myRoutes = this.props.routesData ? this.props.routesData.resultRoutes[0].route.path : this.DEFAULT_COORDS 
    this.forceUpdate()
    this.state = {
      currentLocation: { lat: 43.7747712, lng: -79.5017216 },
      rerender: 0
    };
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.routesData !== prevProps.routesData) {
      // props contains the routes objects
      this.updateMapWithNewPath();
    }
  }

  DEFAULT_COORDS = [
    [43.65324, -79.38274],
    [43.65266, -79.38252],
    [43.65244, -79.38247],
    [43.65217, -79.38236],
    [43.6521, -79.3823],
    [43.65206, -79.38225],
    [43.65201, -79.38215],
    [43.65194, -79.38191],
    [43.65186, -79.38164],
    [43.65181, -79.38157],
    [43.65178, -79.38154],
    [43.65064, -79.38109],
    [43.64972, -79.3807],
    [43.64956, -79.38063],
    [43.64972, -79.3807],
    [43.64989, -79.38077],
    [43.65008, -79.37992],
    [43.65015, -79.37961]
  ];

  flipAndFormatCoordinates = (coords) => {
    // Flip each coordinate from [longitude, latitude] to [latitude, longitude]
    const flippedCoords = coords.map(([lng, lat]) => [lat, lng]);
    return flippedCoords;
}

  updateMapWithNewPath(onPathData) {
    const apiIsLoaded = (map, maps) => {
      // Clear existing paths
      map.data.forEach((feature) => {
        map.data.remove(feature); 
      });

      // Assuming onPathData is a GeoJSON object for simplicity
      // If it's an array or another format, you'll need to convert it to GeoJSON or appropriate format first
      map.data.addGeoJson(onPathData);

      // You can re-use or adjust the styling logic as needed
      map.data.setStyle((feature) => {
        const color = feature.getProperty("stroke");
        const width = feature.getProperty("stroke-width");
        return {
          strokeColor: color,
          strokeWeight: width,
        };
      });
    };
  }
  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude, 
            },
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  render() {
    const apiIsLoaded = (map, maps) => {
      const geoJsonRoute = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: this.flipAndFormatCoordinates(this.myRoutes),
            },
            properties: {
              stroke: "#0047AB",
              "stroke-width": 4,
            },
          },
        ],
      };

      // Add GeoJSON to map
      map.data.addGeoJson(geoJsonRoute);

      // Style features from GeoJSON
      map.data.setStyle((feature) => {
        const color = feature.getProperty("stroke");
        const width = feature.getProperty("stroke-width");
        return {
          strokeColor: color,
          strokeWeight: width,
        };
      });
    };
    return (
      <div>
        <div style={{ height: 800, width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAPS_API_KEY,
              libraries: ["places"],
            }}
            defaultCenter={{ lat: 43.7747712, lng: -79.5017216 }}
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
