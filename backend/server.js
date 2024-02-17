const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys.js');

// routes
const snowRoute = require('./routes/snowRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const mapRoute = require('./routes/mapRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(keys.mongo.dbURI)
  .then((result) => {
      app.listen(4000);
      console.log('connected to db');
  })
  .catch((err) => {
      console.log(err);
  });

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

app.use('/test', () => {console.log('test works')});
app.use('/snow', snowRoute);
// app.use('/user', userRoute);
app.use('/map', mapRoute);

export default locationToCoords;
