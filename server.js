// server.js

'use strict';

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// establish connection with MongoDB
mongoose.connect('localhost', 'test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection established');
});

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES
// public-facing application route
app.use(express.static(__dirname + '/build'));
app.use('/', require('./routes/main'));

// all of our API routes will prefixed with /api
app.use('/api', require('./routes/api/todos'));

// START THE SERVER

app.listen(port);
console.log('Magic happens on port ' + port);
