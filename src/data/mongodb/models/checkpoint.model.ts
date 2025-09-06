import mongoose, { Schema } from 'mongoose';

const checkpointSchema = new Schema({
  unit_id: {
    type: String,
    required: [true, 'Please add a unit Id'],
    unique: true,
    trim: true,
    maxlength: [50, 'Unit Id can not be more than 50 characters']
  },
  state: {
    type: [String],
    required: true,
    default: ['CREATED'],  
    enum: [
      'CREATED',
      'PICKED UP',
      'IN_TRANSIT',
      'AT_FACILITY',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'EXCEPTION'
    ]
  },
  comment: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    maxlength: [500, 'Location can not be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const CheckpointModel = mongoose.model('Checkpoint', checkpointSchema );
