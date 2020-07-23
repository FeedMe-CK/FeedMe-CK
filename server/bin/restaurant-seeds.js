const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

mongoose.connect('mongodb://localhost/FeedMe', {
  useNewUrlParser: true
});

const restaurants = [
  {
    name: "Raja Indian Cuisine",
    prefix: "RIC",
    description: "Genuine and properly spicy Idian cuisine from Rajasthan"
  }, {
    name: "Thai Dream Asian Cuisine",
    prefix: "TDA",
    description: "Always exciting, fresh and colorful"
  }
  ];

  Restaurant.insertMany(restaurants)
  .then(restaurants => {
    console.log('Success! Added ' + restaurants.length + ' restaurants to the database');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });