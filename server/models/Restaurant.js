const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
  name: String,
  prefix: String,
  description: String,
  imgName: String,
  imgPath: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;