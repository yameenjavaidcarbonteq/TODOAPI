const { MongoClient, ObjectID } = require('mongodb');
const { Todo } = require('../../domain/entities');
const { TodoAdapter } = require('./TodoAdapter');

class TodoRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    
  }

  async getById(id) {
    
  }

  async create(todo) {
    
  }

  async update(todo) {
    
  }

  async delete(id) {
    
  }
}

module.exports = TodoRepository;