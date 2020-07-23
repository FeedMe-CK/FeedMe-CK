const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  orderId: {
    type: String,
    unique: true
  },
  customer: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  totPrice: Number,
  state: {
    type: String,
    enum: ['placed', 'inPreparation', 'outForDelivery'],
    default: 'placed'
  },
  scheduledDelivery: Date,
  items: Object,
  subOrders: 
  {
    type: String,
    ref: 'subOrderId'
  },
},
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;