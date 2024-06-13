const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const TODO = mongoose.model("TODO", todoSchema);

module.exports = TODO;