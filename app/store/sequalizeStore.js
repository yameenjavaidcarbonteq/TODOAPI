const Todo = require('../domain/mongo_entities/todo');
const store = require('./store');

class sequalizeStore extends store{

  constructor()
  {
    console.log("In Sequalize Todo");
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
    const [updated] = await Todo.update(data, { where: { id } });
    if (!updated) {
      return null;
    }
    const todo = await Todo.findByPk(id);
    return todo;
  };
  
  async deleteTodo (id) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return null;
    }
    await todo.destroy();
    return todo;
  };
}

module.exports = sequalizeStore;
