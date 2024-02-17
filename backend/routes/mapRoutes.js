const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();

const client = new Client({});

// Convert location in string format to latitude and longitude
async function locationToCoords(location) {
    const api = `${keys.maps.url}${location}&key=${keys.maps.mapsAPI}`;
    let response = await fetch(api);
    if (await !response.ok) {
      console.log(response.error);
    } else {
      response = await response.json();
    }
  
    const locationObject = await response.results[0].geometry.location;
    if (!locationObject) {
      console.log('Cannot obtain location.');
    } else {
      return await locationObject;
    }
}

async function getPlowedData(points) {
    const api = `${keys.snowPlotData.url}`;
    let geoJsonResponse = await fetch(api); // returns a large amount of data
    if (await !geoJsonResponse.ok) {
        console.log(geoJsonResponse.error);
    } else {
        geoJsonResponse = await geoJsonResponse.json();
    }

    const latMin = -79.54;
    const latMax = -79.20;
    const lngMin = 43.60;
    const lngMax = 43.67;

    const isWithinBounds = (coordinates) => { // coordinates is an array, so check if some of those points are within the bounds
        return coordinates.some(coordinate => {
            return (coordinate[0] >= latMin && coordinate[0] <= latMax && coordinate[1] >= lngMin && coordinate[1] <= lngMax);
        });
    };

    const filteredPoints = (geoJsonResponse.features).filter((feature) => isWithinBounds(feature.geometry.coordinates));

    return filteredPoints;
}

router.get('/temp', async (req, res) => {
    console.log('temp reached');
    const bbPoints = await boundingBox(req.query.start, req.query.end);
    const plowedPaths = await getPlowedData(bbPoints);
    res.status(200).json(plowedPaths.length);
})

// box for filtering
async function boundingBox(start, end) {
    // const oCoords = await locationToCoords(st    art);
    // const dCoords = await locationToCoords(end);
    // const coords = {
    //     start: oCoords,
    //     end: dCoords
    // }

    // create bounding box + 1000m, filter
    maxLat = Math.max(start.lat, end.lat);
    minLat = Math.min(start.lat, end.lat);
    maxLng = Math.max(start.lng, end.lng);
    minLng = Math.min(start.lng, end.lng);

    // latitude + longitude conversion to 1km leeway
    const expandLat = 0.009;
    maxLat += expandLat;
    minLat -= expandLat;

    // latitude based on location
    const avgLat = (maxLat + minLat) / 2;
    const expandLng = 1 / (111.32 * Math.cos(avgLat * (Math.PI / 180))); 
    maxLng += expandLng; 
    minLng -= expandLng; 

    const points = {
        'latMin' : minLat, 
        'latMax' : maxLat, 
        'lngMin' : minLng, 
        'lngMax' : maxLng
    };
    console.log(points);
    return points;
}

router.post("/plowRoutes", upload.none(), async (req, res) => { 
    waypoints = nearbyWaypoints(start, end); // lat and lng, find waypoints in one area (1000 m away from box bounded by 2 waypoints)
    console.log(coords); 
    
});

router.post('/computeDefaultRoutes', upload.none(), (req, res) => {
    // computeAlternativeRoutes is always true, start and end are addresses
    const { start, end, computeAlternativeRoutes } = req.body;
    const travelMode = "drive";

    if (!start || !end) {
        res.status(400).status("Missing required location inputs!");
    }

    try {
        const response = client.directions({
            params: {
                start: start,
                end: end,
                mode: travelMode,
                alternatives: computeAlternativeRoutes,
                key: keys.maps.mapsAPI,
            },
            timeout: 10000,
        })
    } catch {
        console.error(error);
        res.status(500).send('Error computing path')
    }
});

module.exports = router;