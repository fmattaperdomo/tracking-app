import mongoose, { Schema } from 'mongoose';

const checkpointSchema = new Schema({
  state: {
    type: [String],
    required: true,
    default: 'CREATED',  
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  }  
});
checkpointSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
});

export const CheckpointModel = mongoose.model('Checkpoint', checkpointSchema );
