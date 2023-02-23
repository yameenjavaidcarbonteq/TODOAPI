const store = require('../../domain/interfaces/storeInterfaceTodo');
const todoSeq = require('../sequelize_models/todo');
const TodoItem =  require('../../domain/entities/todo');

class sequelizeStore extends store{
    constructor() {
      super();
      this.model = todoSeq;
    }
    
    async find(query) {
      const todoRecords = await this.model.findAll();
      return todoRecords.map((todoRecord) => new TodoItem(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted));
    }
  
    async findOne(query) {
      const todoRecord = await this.model.findByPk(id);
      if (!todoRecord) {
        return null;
      }
      return new TodoItem(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.status);
    }
    
    async findbyid(id) {
      const todoRecord = await this.model.findByPk(id);
      if (!todoRecord) {
        return null;
      }
      return new TodoItem(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.status);
    }
  
    async create(todoItem) {
        
      await this.model.create({
        id: todoItem.id,
        title: todoItem.title,
        description: todoItem.description,
        isCompleted: todoItem.isCompleted,
      });
    }
  
    async update(todoItem) {
      const [rowsUpdated] = await this.model.update(
        {
          title: todoItem.title,
          description: todoItem.description,
          isCompleted: todoItem.isCompleted,
        },
        {
          where: { id: todoItem.id },
        }
      );
      if (rowsUpdated === 0) {
        throw new Error(`Todo item with id ${todoItem.id} not found`);
      }
    }
  
    async delete(id) {
      const rowsDeleted = await this.model.destroy({
        where: { id },
      });
      if (rowsDeleted === 0) {
        throw new Error(`Todo item with id ${id} not found`);
      }
    }
  }
  
module.exports = sequelizeStore;
