import mongoose, { Schema } from 'mongoose';

const shipmentSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  sender_contact: {
    type: String,
    required: [true, 'Please add a sender contact'],
    maxlength: [500, 'Sender contact can not be more than 500 characters']
  },  
  receiver_contact: {
    type: String,
    required: [true, 'Please add a receiver contact'],
    maxlength: [500, 'Sender receiver can not be more than 500 characters']
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ShipmentModel = mongoose.model('Shipment', shipmentSchema );
