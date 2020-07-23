const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String,
    unique: true
  },
  googleId: String,
  password: String,
  address: String,
  placeId: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;