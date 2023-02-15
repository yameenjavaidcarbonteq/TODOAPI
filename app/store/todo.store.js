const Todo = require('../domain/mongo_entities/todo');


class TodoStore{

  constructor(TodoAdapter)
  {
    console.log("In Store Todo");
    this.Todoadapter = TodoAdapter
  }
  hello()
  {
    console.log("asdasdasd");
  }
  async createTodo (todo) {
    // const todo = await Todo.create(data);
    console.log("Creating Todo");
    const todoData = Todo.toMongoData(todo);
    console.log("Creating Todo: ",todo); 
    const result = await TodoAdapter.insert(todoData);
    return result;
  };

  async getTodos () {
    // const todos = await Todo.findAll();
    const todos = await TodoAdapter.find('todos', {});
    const todoEntities = todos.map((todo) => Todo.toDomainEntity(todo));
    return todoEntities;
  };

  async getTodoById (id) {
    // const todo = await Todo.findByPk(id);
    const todo = await TodoAdapter.find('todos', {_id: ObjectId(id)});
    const todoEntity = Todo.toDomainEntity(todo);
    return todoEntity;
  };

  async updateTodo (id, data) {
    // const [updated] = await Todo.update(data, { where: { id } });
    // if (!updated) {
    //   return null;
    // }
    // const updated = await Todo.findByPk(id);
    
    const todo = data;
    const updated = await TodoAdapter.update('todos', { _id: ObjectId(id) }, todo);
    return updated;
  };

  async deleteTodo (id) {
    // const todo = await Todo.findByPk(id);
    // if (!todo) {
    //   return null;
    // }
    // await todo.destroy();
    const deleted = await adapter.delete('todos', { _id: ObjectId(id) });
    return deleted;
  };

}

module.exports = TodoStore;
