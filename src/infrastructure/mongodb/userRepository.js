const { ObjectID } = require('mongodb');
const UserRepository = require('../../domain/repositories/UserRepository');

class MongoDBUserRepository extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByUsername(username) {
    
  }

  async findOne(id) {
    
  }

  async save(user) {
    
  }
}

module.exports = MongoDBUserRepository;