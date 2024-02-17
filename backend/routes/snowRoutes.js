const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.get("/", (req, res) => {
    res.json('snow');
});

router.get("/input", (req, res) => {
    res.json('here');
})

router.post("/paths", upload.none(), async (req, res) => { // upload.none here is necessary to parse formdata correctly
    const { start, end } = req.body;
    res.status(200).json("starting location: " + start + ", destination: " + end);
})

module.exports = router;
