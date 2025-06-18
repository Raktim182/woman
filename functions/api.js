const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('router is running..');
});


 
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

 

// Connect Database
connectDB();

// Middleware
router.use(cors());
router.use(express.json());
router.use('/api/admin', require('./routes/admin'));
// Serve static files
router.use(express.static(path.join(__dirname, '../')));

// Routes
router.use('/api/auth', require('./routes/auth'));
router.use('/api/location', require('./routes/location'));

// Serve HTML files
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
router.listen(PORT, () => console.log(`Server running on port ${PORT}`));




router.use('/.netlify/functions/api', router);
module.exports.handler = serverless(router);

//const port = 8080;
//router.listen(process.env.PORT || port, () => {	
//	console.log(`Listening on port ${port}`);
//});