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
      const geoJsonRoute = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -79.143500761,
                43.7959346370001
              ],
              [
                -79.1432121559999,
                43.796028113
              ],
              [
                -79.142620468,
                43.7961649710001
              ],
              [
                -79.142497362,
                43.7962059010001
              ],
              [
                -79.1423872569999,
                43.7962463050001
              ],
              [
                -79.142229214,
                43.79632151
              ],
              [
                -79.142160695,
                43.796358551
              ],
              [
                  -79.142075193,
                  43.7964138200001
              ],
              [
                  -79.14190397,
                  43.7965316130001
              ],
              [
                  -79.141804398,
                  43.7966080630001
              ],
              [
                  -79.141730363,
                  43.79668235
              ],
              [
                  -79.141652994,
                  43.796751057
              ],
              [
                  -79.141574572,
                  43.7968399040001
              ],
              [
                  -79.1415077879999,
                  43.7969233690001
              ],
              [
                  -79.141417302,
                  43.797032583
              ],
              [
                  -79.141313801,
                  43.797142325
              ],
              [
                  -79.1412368219999,
                  43.7972328870001
              ],
              [
                  -79.141142107,
                  43.7973320780001
              ]
            ]
          },
          "properties": {
            "stroke": "#ff0000",
            "stroke-width": 2
          }
        }]
      };

      // Add GeoJSON to map
      map.data.addGeoJson(geoJsonRoute);

      // Style features from GeoJSON
      map.data.setStyle((feature) => {
        const color = feature.getProperty('stroke');
        const width = feature.getProperty('stroke-width');
        return {
          strokeColor: color,
          strokeWeight: width
        };
      });
    };
    return (
      <div>
        <div style={{ height: 800, width: "100%" }}>
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
