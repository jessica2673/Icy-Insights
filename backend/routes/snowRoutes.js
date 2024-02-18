const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const keys = require('../config/keys');

const mongoose = require('mongoose');
const Intersection = require('../models/intersectionModel');

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

// Routes below used to create/get intersection for internal use only
router.post("/add-intersect", async (req, res) => {
    const name = "Insert name";
    const coords = {
        "lat": 0,
        "lng": 0
    }
    const newIntersection = {
        "name": name,
        "coords": coords
    }
    const intersection = await new Intersection(newIntersection);

    await intersection.save().then((result) => {
        res.status(200).json('finished');
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/get-intersect', async(req, res) => {
    const id = "0";
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404);
    }

    found = await Intersection.findById(id);
    console.log(found);
})

module.exports = router;
