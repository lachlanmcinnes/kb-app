// import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

// define app
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL);