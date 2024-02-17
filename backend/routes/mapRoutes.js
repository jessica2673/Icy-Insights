const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');
const multer = require('multer');
const upload = multer();

const client = new Client({});

router.post('/computeDefaultRoutes', (req, res) => {
    console.log('hi');
    // computeAlternativeRoutes is always true, start and end are addresses
    const { origin, destination, computeAlternativeRoutes } = req.body;
    const travelMode = "drive";

    if (!origin || !destination) {
        res.status(400).status("Missing required location inputs!");
    }

    try {
        const response = client.directions({
            params: {
                origin: start,
                destination: end,
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

async function nearbyWaypoints(origin, destination) {
    const oCoords = await locationToCoords(origin);
    const dCoords = await locationToCoords(destination);
    const coords = {
        start: oCoords,
        end: dCoords
    }

    // create bounding box
}

module.exports = router;