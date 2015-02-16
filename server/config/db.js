import mongoose from 'mongoose';
import uriUtil from 'mongodb-uri';

// establish connection with MongoDB based on environment

// production MongoDB configuration
switch (process.env.NODE_ENV) {
  case 'production':
    // config for MongoLab instance on Heroku, you can swap this with your own
    let mongoUri = process.env.MONGO_URI;
    let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }

    let mongooseUri = uriUtil.formatMongoose(mongoUri);
    mongoose.connect(mongooseUri, options);
    break;

  case 'test':
    mongoose.connect('localhost', 'react-node-project-seed-test');
    break;

  default:
    // Assume development if no NODE_ENV set, but issue a warning
    if(process.env.NODE_ENV !== 'development') {
      console.warn('Caution! Unrecognized Node environment:', process.env.NODE_ENV, 'Defaulting to development database.');
    }
    mongoose.connect('localhost', 'react-node-project-seed-development');
    break;
};

const db = mongoose.connection;

// Log errors, connections and disconnections from DB to the console
db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnecting', () => {
  console.log('Database', db.name, 'disconnecting.')
});
db.once('open', () => {
  console.log('Connection to', db.name, 'established.');
});

export default db;