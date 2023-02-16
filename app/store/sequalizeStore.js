const Todo = require('../domain/mongo_entities/todo');


class TodoStore{

  constructor()
  {
    console.log("In Store Todo");
    this.createTodo = this.createTodo.bind(this);
  }
  
  async createTodo (todo) {
    // const todo = await Todo.create(data);
    console.log("Creating Todo");
    const todoData = Todo.toMongoData(todo);
    // const result = await this.Todoadapter.hello(todoData);
    const result = await this.TodoAdapter.insert(todoData);
    console.log(result);
    return result;
  };

  async getTodos () {
    const todos = await Todo.findAll();
    return todos;
  };

  async getTodoById (id) {
    const todo = await Todo.findByPk(id);
    return todo;
  };

  async updateTodo (id, data) {
    // const [updated] = await Todo.update(data, { where: { id } });
    // if (!updated) {
    //   return null;
    // }
    // const updated = await Todo.findByPk(id);
    
    const todo = data;
    const updated = await this.TodoAdapter.update('todos', { _id: ObjectId(id) }, todo);
    return updated;
  };

  async deleteTodo (id) {
    // const todo = await Todo.findByPk(id);
    // if (!todo) {
    //   return null;
    // }
    // await todo.destroy();
    const deleted = await this.adapter.delete('todos', { _id: ObjectId(id) });
    return deleted;
  };

}

module.exports = TodoStore;
