const store = require('../Store');
const todoMongo = require('../../../infrastructure/mongo_models/todo');

const todoEntity = require('../../../domain/entities/todo');

class MongoStore extends store{
    constructor() {
        super();
        this.model = todoMongo;
    }   

    async find(query) {
        const todos = this.model.find(query);
        return todos;
    }

    async findOne(query) {
        const foundTodo = this.model.findOne(query);
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
        console.log(data);
        const instance = new this.model(data);
        return instance.save();
    }

    async update(id, data) {
        this.model.findByIdAndUpdate(id, data, { new: true }).then
        (savedTodo => {
        const todoEntity = new todoEntity(
          savedTodo.id,
          savedTodo.title,
          savedTodo.desciption,
          savedTodo.status);
          return todoEntity;
        })
        .catch(err => {return err}); 
    }
    

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}
  
module.exports = MongoStore;
