class IUserRepository {
    async findbyId(userId) {
      throw new Error("findbyId() not implemented");
    }
  
    async findByEmail(email) {
      throw new Error("findByEmail() not implemented");
    }
  
    async create(user) {
      throw new Error("create() not implemented");
    }
  
    async isValid(userId) {
      throw new Error("isValid() not implemented");
    }
  
    async update(userItem) {
      throw new Error("update() not implemented");
    }
  
    async count() {
      throw new Error("count() not implemented");
    }
  }
  
  module.exports = {
    IUserRepository
  };
  