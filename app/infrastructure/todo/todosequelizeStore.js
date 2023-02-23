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
      return todoRecords;
    }
  
    async findOne(query) {
      console.log(query);
      const todoRecord = await this.model.findOne({ where: query });
      console.log("Finding this: ",todoRecord);
      if (!todoRecord) {
        return null;
      }
      return todoRecord;
    }
    
    async findbyid(id) {
      const todoRecord = await this.model.findOne({ where: id });
      if (!todoRecord) {
        return null;
      }
      return todoRecord;
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
          where: { 'id': todoItem.id },
        }
      );
      if (rowsUpdated === 0) {
        throw new Error(`Todo item with id ${todoItem.id} not found`);
      }
    }
  
    async delete(id) {
      const rowsDeleted = await this.model.destroy({
        where: { 'id': id }
      });
      if (rowsDeleted === 0) {
        throw new Error(`Todo item with id ${id} not found`);
      }
    }
  }
  
module.exports = sequelizeStore;
