import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique:true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
   
  },
  todos:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",
        default:[]
    }
  ]
 
});


export default mongoose.models.User || mongoose.model('User', UserSchema);
