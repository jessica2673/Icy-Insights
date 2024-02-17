const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();

const client = new Client({});

async function getPlowedData(points) {
    const api = `${keys.snowPlotData.url}`;
    let geoJsonResponse = await fetch(api);
    if (!geoJsonResponse.ok) {
        console.log(geoJsonResponse.error);
        return;
    }
    geoJsonResponse = await geoJsonResponse.json();

    const isWithinBounds = (coordinate) => {
        return (
            coordinate[0] >= points.lngMin && coordinate[0] <= points.lngMax &&
            coordinate[1] >= points.latMin && coordinate[1] <= points.latMax
        );
    };

    const filteredFeatures = geoJsonResponse.features.filter(feature => {
        // always linestring for To data
        if (feature.geometry.type === "LineString") {
            return feature.geometry.coordinates.some(coords => {
                if (feature.geometry.type === "Polygon") {
                    return coords.some(ring => ring.some(isWithinBounds));
                }
                return isWithinBounds(coords);
            });
        }
        return false;
    });

    console.log(filteredFeatures); // debug
    return filteredFeatures;
}


router.get('/temp', async (req, res) => {
    console.log('temp reached');
    const bbPoints = await boundingBox(req.query.start, req.query.end);
    const plowedPaths = await getPlowedData(bbPoints);
    console.log(plowedPaths);
    res.status(200).json(plowedPaths.length);
})

// box for filtering
async function boundingBox(start, end) {
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
