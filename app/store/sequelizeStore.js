const DatabaseAdapterFactory = require('../infrastructure/adapterfactory');
const store = require('./store');

class sequelizeStore extends store{

  constructor()
  {
    super();
    console.log("In sequelize Todo");
    this.adapter = DatabaseAdapterFactory.createAdapter('sequelize');
    this.adapter.connect()
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
    });
    
  }
  
  async createTodo (data) {
    const todo = await this.adaptercreate(data);
    return todo;
  };

  async getTodos () {
    const todos = await this.adapterfindAll();
    return todos;
  };

  async getTodoById (id) {
    const todo = await this.adapterfindByPk(id);
    return todo;
  };

  async updateTodo (id, data) {
    const [updated] = await this.adapterupdate(data, { where: { id } });
    if (!updated) {
      return null;
    }
    const todo = await this.adapterfindByPk(id);
    return todo;
  };
  
  async deleteTodo (id) {
    const todo = await this.adapterfindByPk(id);
    if (!todo) {
      return null;
    }
    await this.adapterdestroy();
    return todo;
  };
}

module.exports = sequelizeStore;
