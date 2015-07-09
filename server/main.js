require('babel/register');
var server = require('./server.js');
// The database instance is created when this file is required
var db = require('./config/db');

var PORT = process.env.PORT || 8080; // set our port

// Initialize the server
server.listen(PORT, function() {
  console.log('Node/iojs server listening on port', PORT);
});
