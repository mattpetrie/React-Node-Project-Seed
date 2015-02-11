import express from 'express';
import mongoose from 'mongoose';
import uriUtil from 'mongodb-uri';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

// establish connection with MongoDB

// config for MongoLab instance on Heroku, you can swap this with your own
// production MongoDB configuration
if (process.env.NODE_ENV === 'production'){
  let mongoUri = process.env.MONGO_URI;
  let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }

  let mongooseUri = uriUtil.formatMongoose(mongoUri);
  mongoose.connect(mongooseUri, options);

} else {
  mongoose.connect('localhost', 'react-node-project-seed-development');
}

const db = mongoose.connection;
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

const port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES
// public-facing application route
app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/', require('./public/main'));

// all of our API routes will prefixed with /api
app.use('/api', require('./api/todos'));

// START THE SERVER

app.listen(port);
console.log('Node/io.js ' + process.version + ' server started on ' + port);
