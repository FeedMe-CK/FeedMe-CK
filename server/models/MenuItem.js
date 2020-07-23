const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
  itemNo: String,
  name: String,
  description: String,
  price: Number,
  category: Array,
  prepTime: Number,
  restaurant:   {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  imgName: String,
  imgPath: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;