const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();

const client = new Client({});

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

router.post("/plowRoutes", upload.none(), async (req, res) => { 
    waypoints = nearbyWaypoints(start, end); // lat and lng, find waypoints in one area (1000 m away from box bounded by 2 waypoints)
    console.log(coords); 
    
});

async function nearbyWaypoints(start, end) {
    const oCoords = await locationToCoords(start);
    const dCoords = await locationToCoords(end);
    const coords = {
        start: oCoords,
        end: dCoords
    }

    // create bounding box + 1000m, filter
    maxLat = Math.max(oCoords.lat, dCoords.lat);
    minLat = Math.min(oCoords.lat, dCoords.lat);
    maxLng = Math.max(oCoords.lng, dCoords.lng);
    minLng = Math.ming(oCoords.lng, dCoords.lng);

    // latitude + longitude conversion to 1km leeway
    const expandLat = 0.009;
    maxLat += expandLat;
    minLat -= expandLat;

    // latitude based on location
    const avgLat = (maxLat + minLat) / 2;
    const expandLng = 1 / (111.32 * Math.cos(avgLat * (Math.PI / 180))); 
    maxLng += expandLng; 
    minLng -= expandLng; 

    const points = await filterPoints({minLat, maxLat, minLng, maxLng});
    return points;
}

async function filterPoints(points, ) {

}

module.exports = router;