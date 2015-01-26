var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name       : String
  , completed  : { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
