const Todo = require('../domain/mongo_entities/todo');
const DatabaseAdapterFactory = require('../infrastructure/adapterfactory');
const store = require('./store');
class mongoStore extends store{

  constructor()
  {
    super();
    console.log("In mongoStore");

    this.adapter = DatabaseAdapterFactory.createAdapter('mongodb');
    this.adapter.connect()
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
    });
  }
  
  async createTodo (todo) {
    const todoData = Todo.toMongoData(todo);
    const result = await this.adapter.insert('todos',todoData);
    console.log(result);
    return result;
  };

  async getTodos () {
    const todos = await this.adapter.find('todos', {});
    const todoEntities = todos.map((todo) => Todo.toDomainEntity(todo));
    return todoEntities;
  };

  async getTodoById (id) {
    const todo = await this.adapter.find('todos', {_id: ObjectId(id)});
    const todoEntity = Todo.toDomainEntity(todo);
    return todoEntity;
  };

  async updateTodo (id, data) {
    const todo = data;
    const updated = await this.adapter.update('todos', { _id: ObjectId(id) }, todo);
    return updated;
  };

  async deleteTodo (id) {
    const deleted = await this.adapter.delete('todos', { _id: ObjectId(id) });
    return deleted;
  };

}

module.exports = mongoStore;
