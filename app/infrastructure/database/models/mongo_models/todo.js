const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  id: {
    type: String,
    required: false,
  }
}, {
  versionKey: false,
  id: false
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;