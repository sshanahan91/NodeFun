var mongoose = require('mongoose');

module.exports = mongoose.model('Recipe', {
  title:        String,
  author:       String,
  img:          String,
  description:  String,
  ingredients: [{ ingredient: String, quantity: Number }],
  updatedLast: { type: Date, default: Date.now }
});