const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json('snow');
});

router.get("/input", (req, res) => {
    res.json('here');
})

module.exports = router;
