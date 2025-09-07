import mongoose, { Schema } from 'mongoose';

const unitSchema = new Schema({
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a description for the unit'],
    maxlength: 100
  },
  weight: {
    type: String,
    trim: true,
    required: [true, 'Please add a weight for the unit'],
    maxlength: 100
  },
  dimensions: {
    type: String,
    trim: true,
    required: [true, 'Please add a dimensions for the unit'],
    maxlength: 100
  },
  currentStatus: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  shipment: {
    type: Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true
  }  
});

unitSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
});

export const UnitModel = mongoose.model('Unit', unitSchema );
