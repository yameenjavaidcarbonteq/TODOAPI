const Todo = require('../domain/mongo_entities/todo');


class mongoStore extends store{

  constructor()
  {
    console.log("In mongoStore");
    this.createTodo = this.createTodo.bind(this);
  }
  
  async createTodo (todo) {
    const todoData = Todo.toMongoData(todo);
    const result = await this.TodoAdapter.insert(todoData);
    return result;
  };

  async getTodos () {
    const todos = await this.TodoAdapter.find('todos', {});
    const todoEntities = todos.map((todo) => Todo.toDomainEntity(todo));
    return todoEntities;
  };

  async getTodoById (id) {
    const todo = await this.TodoAdapter.find('todos', {_id: ObjectId(id)});
    const todoEntity = Todo.toDomainEntity(todo);
    return todoEntity;
  };

  async updateTodo (id, data) {
    const todo = data;
    const updated = await this.TodoAdapter.update('todos', { _id: ObjectId(id) }, todo);
    return updated;
  };

  async deleteTodo (id) {
    const deleted = await this.adapter.delete('todos', { _id: ObjectId(id) });
    return deleted;
  };

}

module.exports = mongoStore;
