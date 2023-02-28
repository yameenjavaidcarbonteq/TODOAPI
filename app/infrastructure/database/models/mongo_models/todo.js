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
  },createdAt: {
    type: 'Date',
    default: Date.now
  }
}, {
  versionKey: false,
  id: false
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;