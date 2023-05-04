const {TodoRepositoryPort} = require ("@domain");
const TodoModelMongoose = require ("../../models/mongooseModels/TodoModelMongoose");

const {TodoEntity} = require("@domain");
const {PaginationData} = require ('../../utils/PaginationData');

class TodoRepositoryMongoose extends TodoRepositoryPort {
    constructor() {
      super();
      this.todoModel = TodoModelMongoose;
    }
  
    async findAll(query, paginatedOptions) {
      const todosCount = await this.todoModel.count(query);
      const paginatedData = new PaginationData(paginatedOptions, todosCount);
      const paginatedTodos = await this.todoModel.find(query)
      .limit(paginatedOptions.limit())
      .skip(paginatedOptions.offset());
    
      return paginatedTodos;
    }
    
    async findbyId(id) {
      const todoDoc = await this.todoModel.findOne({id});
      if(todoDoc){
        return TodoEntity.createFromObject(todoDoc);
      }
    }
  
    async create(todo) {
      const todoDoc = await this.todoModel.create(todo);
      return TodoEntity.createFromObject(todoDoc);
    }
  
    async update(todoItem) {
      const updatedTodo = await this.todoModel.findOneAndUpdate(
        { id: todoItem.id },todoItem,{new: true});
      if (updatedTodo) {
        return TodoEntity.createFromObject(updatedTodo);
      }
    }
  
    async delete(todoItem) {
      return await this.todoModel.findOneAndRemove(todoItem);
    }   

    async count() {
      return await this.model.count();
    }
    
    async first(limit = 1) {
      const todos = await this.model.find({}).limit(limit);
      return todos.map(todo => TodoEntity.createFromObject(todo));
    }
  } 
  
module.exports = {
  TodoRepositoryMongoose
};