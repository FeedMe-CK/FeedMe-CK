const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subOrderSchema = new Schema({
  subOrderId: {
    type: String,
    unique: true
  },
  subTotal: Number,
  state: {
    type: String,
    enum: ['placed', 'inPreparation', 'outForDelivery'],
    default: 'placed'
  },
  items: Object,
  restaurant: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
},
{
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const SubOrder = mongoose.model('SubOrder', subOrderSchema);

module.exports = SubOrder;