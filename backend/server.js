const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys.js');

// routes
const snowRoute = require('./routes/snowRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
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

app.use('/test', () => {console.log('test works')});
app.use('/snow', snowRoute);

