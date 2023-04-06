class TodoRepositoryPort {
    async findAll(query, paginatedOptions) {
      throw new Error("findAll() not implemented");
    }
  
    async create(todo) {
      throw new Error("create() not implemented");
    }
  
    async update(todoItem) {
      throw new Error("update() not implemented");
    }
  
    async delete(id) {
      throw new Error("delete() not implemented");
    }

    async findbyId(id) {
      throw new Error("findbyId() not implemented");
    }
  
    async count() {
      throw new Error("count() not implemented");
    }
  }
  
  module.exports = {
    TodoRepositoryPort
  };