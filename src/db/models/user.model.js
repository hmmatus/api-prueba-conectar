const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true
  },
  idType: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  monthRevenue: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('User', userSchema);

