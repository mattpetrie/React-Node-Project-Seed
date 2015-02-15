import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id         : String
  , name       : String
  , completed  : { type: Boolean, default: false }
});

export default mongoose.model('Todo', TodoSchema);
