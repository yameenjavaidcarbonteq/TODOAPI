const UserRepository = require('../infrastructure/repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(user) {
    return this.userRepository.create(user);
  }

  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}

module.exports = UserService;