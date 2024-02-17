const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const keys = require('../config/keys');

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

router.get("/", (req, res) => {
    res.json('snow');
});

router.get("/input", (req, res) => {
    res.json('here');
})

router.post("/paths", upload.none(), async (req, res) => { // upload.none here is necessary to parse formdata correctly
    const { start, end } = req.body;
    const startCoords = await locationToCoords(start);
    const endCoords = await locationToCoords(end);
    const coords = {
        start: startCoords,
        end: endCoords
    }
    console.log(coords);
    const message = "starting location with lat: " + startCoords.lat + ", lng: " + startCoords.lng + ", and destination with lat: " + endCoords.lat + " lng: " + endCoords.lng;
    await res.status(200).json(coords);
})

module.exports = router;
