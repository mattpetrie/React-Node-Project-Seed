var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name       : String
  , done       : { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
