import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]    
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['USER_ROLE','ADMIN_ROLE'],
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: 6,
    select: false        
  },
  createdAt: {
    type: Date,
    default: Date.now
  }  
});

export const UserModel = mongoose.model('User', userSchema );
