const {ITodoRepository} = require ("@domain");
const TodoModelMongoose = require ("../../models/mongooseModels/TodoModelMongoose");

const {TodoEntity} = require("@domain");
const {PaginationData} = require ('../../utils/PaginationData');

class TodoRepositoryMongoose extends ITodoRepository {
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
      paginatedTodos.forEach(function (toDo) {
        paginatedData.addItem(TodoEntity.createFromObject(toDo))
      });
      return paginatedData.getPaginatedData();
    
    }
    
    async findbyId(id) {
      const todoDoc = await this.todoModel.findOne({id :id});
      if(todoDoc){
        return TodoEntity.createFromObject(todoDoc);
      }
    }
  
    async create(todo) {
      const todoDoc = await this.todoModel.create(todo);
      return TodoEntity.createFromObject(todoDoc);
    }
  
    async update(todoItem) {
      // to return old document don't set the new flag
      // set the old flag to return updated doc
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
  } 
  
module.exports = {
  TodoRepositoryMongoose
};