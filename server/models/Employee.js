const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  userName: { type: String,
    unique: true
  },
  email: String,
  password: String,
  restaurant: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;