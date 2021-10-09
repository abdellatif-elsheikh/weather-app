// TO DO
/**
 * 1- create an array to hold my data
 * 2- create instance for express
 * 3- connect express with other liberarys
 * 4- create a post route to insert data inside the array
 * 5- create a get route to take the information from the array and passit back to my app.js 
 */

// Create an empty array
let allData = [];

// define express
const express = require("express");
// Create an express instance
const app = express();
// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
const cors = require('cors');
app.use(cors());

// Initialize main project folder
app.use(express.static('view'));

// Setup server
port = 5000;
app.listen(port, ()=> console.log(`server run on local server ${port}`));

// Create a post route to receve data
app.post('/postData', (req, res)=>{
    allData = req.body
    console.log(allData);
});

