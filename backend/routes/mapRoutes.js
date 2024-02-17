const express = require('express');
const router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");
const keys = require('../config/keys');

const client = new Client({});

router.post('/computeRoute', (req, res) => {
    const { origin, destination } = req.body;
    const travelMode = "drive";

    if (!origin || !origin.address || !destination.address || !destination) {
        res.status(400).status("Missing required location inputs!");
    }

    try {
        const response = client.directions({
            params: {
                origin: origin.address,
                destination: destination.address,
                mode: travelMode,
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