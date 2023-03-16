const logger from'../../../logger');
const store from'../../@domain/Interfaces/TodoRepository');
const todoSeq from'../sequelizeModels/TodoModel');
const TodoItem =  require('../../@domain/Entities/todo');

class Repositoy extends store {
  constructor() {
    super();
    this.model = todoSeq;
  }

  async find(query) {
    try {
      const todoRecords = await this.model.findAll();
      return todoRecords;
    } catch (error) {
      logger.error(`Error finding todos: ${error.message}`);
      throw new Error(`Error finding todos: ${error.message}`);
    }
  }

  async findOne(query) {
    try {
      
      const todoRecord = await this.model.findOne({ where: query });
      if (!todoRecord) {
        return null;
      }
      return todoRecord;
    } catch (error) {
      logger.error(`Error finding todo: ${error.message}`);
      throw new Error(`Error finding todo: ${error.message}`);
    }
  }

  async findbyid(id) {
    try {
      const todoRecord = await this.model.findOne({ where: id });
      if (!todoRecord) {
        return null;
      }
      return todoRecord;
    } catch (error) {
      logger.error(`Error finding todo by id: ${error.message}`);
      throw new Error(`Error finding todo by id: ${error.message}`);
    }
  }

  async create(todoItem) {
    try {
      await this.model.create({
        id: todoItem.id,
        title: todoItem.title,
        description: todoItem.description,
        isCompleted: todoItem.isCompleted,
      });
    } catch (error) {
      logger.error(`Error creating todo: ${error.message}`);
      throw new Error(`Error creating todo: ${error.message}`);
    }
  }

  async update(todoItem) {
    try {
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
    } catch (error) {
      logger.error(`Error updating todo: ${error.message}`);
      throw new Error(`Error updating todo: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const rowsDeleted = await this.model.destroy({
        where: { id: id },
      });
      if (rowsDeleted === 0) {
        throw new Error(`Todo item with id ${id} not found`);
      }
    } catch (error) {
      logger.error(`Error deleting todo: ${error.message}`);
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  }
}
  
module.exports = Repositoy;
