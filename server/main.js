require('6to5/register');
var server = require('./server.js');
var db = require('./config/db');

var PORT = process.env.PORT || 8080; // set our port

server.listen(PORT, function() {
  console.log('Node/iojs server listening on port', PORT);
});