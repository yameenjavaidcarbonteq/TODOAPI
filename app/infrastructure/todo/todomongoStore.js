const store = require('../../domain/interfaces/storeInterfaceTodo');
const todoMongo = require('../../infrastructure/mongo_models/todo');
const Todo =  require('../../domain/entities/todo');


class MongoStore extends store{
    constructor() {
        super();
        this.model = todoMongo;
    }   

    async find() {
        const todoDocs = await this.model.find().exec();
        return todoDocs;
    }

    
    async findbyid(id) {
        
        const todoDoc = await this.model.findOne(id).exec();
        if (!todoDoc) {
            return null;
        }
        return todoDoc;
    }
    
    async findOne(id) {
        
        console.log("FindOne called for in Todo: ",id);
        const todoDoc = await this.model.findOne(id).exec();
        if (!todoDoc) {
            return null;
        }
        return todoDoc;
    }

    async create(todoItem) {
        const todoDoc = new this.model({
            id: todoItem.id,
            title: todoItem.title,
            description: todoItem.description,
            status: Todo.status,
          });
          await todoDoc.save();
    }

    async update(todoItem) {
        const todoDoc = await this.model.findOne({'id': todoItem.id}).exec();
        if (!todoDoc) {
            throw new Error(`Todo item with id ${todoItem.id} not found`);
        }
        todoDoc.title = todoDoc.title || Todo.title;
        todoDoc.description = todoDoc.description || Todo.description;
        todoDoc.isCompleted = todoDoc.isCompleted || Todo.isCompleted;
        await todoDoc.save();
    }
    

    async delete(id) {
        return this.model.deleteOne({'id':id});
    }
}
  
module.exports = MongoStore;
