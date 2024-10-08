import mongoose from 'mongoose';


const TodoSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite upon initial compilation
export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
