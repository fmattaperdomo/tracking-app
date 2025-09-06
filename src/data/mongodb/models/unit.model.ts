import mongoose, { Schema } from 'mongoose';

const unitSchema = new Schema({
  shipment_id: {
    type: String,
    required: [true, 'Please add a shipment Id'],
    unique: true,
    trim: true,
    maxlength: [50, 'Shipment Id can not be more than 50 characters']
  },  
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
  createdAt: {
    type: Date,
    default: Date.now
  }
},
);

export const UnitModel = mongoose.model('Unit', unitSchema );
