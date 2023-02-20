const store = require('../Store');
const todoSeq = require('../../../infrastructure/sequelize_models/todo');

const todoEntity = require('../../../domain/entities/todo');

class sequelizeStore extends store{
    constructor() {
      super();
      this.model = todoSeq;
    }
    
    async find(query) {
      const todos = this.model.findAll({ where: query });
      return todos;
    }
  
    async findOne(query) {
      const foundTodo = this.model.findOne({ where: query });
        if(foundTodo){
        const todoEntity = new todoEntity(
            foundTodo.id,
            foundTodo.title,
            foundTodo.desciption,
            foundTodo.status);
            return todoEntity;
        }
        return foundTodo;
    }
  
    async create(data) {
        
      data = super.create(data);
      const savedTodo = this.model.create(data);
      if(savedTodo){
        const todoEntity = new todoEntity(
        savedTodo.id,
        savedTodo.title,
        savedTodo.desciption,
        savedTodo.status);
        return todoEntity;
      }
      return savedTodo;
    }
  
    async update(id, data) {
      const instance = await this.model.findByPk(id);
      if (!instance) 
        throw new Error('Instance not found');
      
      instance.update(data).then(([numUpdated, savedTodo]) => {
        const todoEntity = new todoEntity(
          savedTodo[0].id,
          savedTodo[0].title,
          savedTodo[0].desciption,
          savedTodo[0].status);
          return todoEntity;
      });
      
      return savedTodo;
    }
  
    async delete(id) {
      const instance = await this.model.findByPk(id);
      if (!instance) 
        throw new Error('Instance not found');
      return instance.destroy();
    }
  }
  
module.exports = sequelizeStore;
