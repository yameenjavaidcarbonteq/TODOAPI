const store = require('../../domain/interfaces/storeInterfaceTodo');
const todoMongo = require('../../infrastructure/mongo_models/todo');
const TodoItem =  require('../../domain/entities/todo');


class MongoStore extends store{
    constructor() {
        super();
        this.model = todoMongo;
    }   

    async find() {
        const todoDocs = await this.model.find().exec();
        return todoDocs.map((todoDoc) => new TodoItem(todoDoc.id, todoDoc.title, todoDoc.description, todoDoc.status));
    }

    
    async findbyid(id) {
        
        const todoDoc = await this.model.findbyid(id).exec();
        if (!todoDoc) {
        return null;
        }
        return new TodoItem(todoDoc.id, todoDoc.title, todoDoc.description, todoDoc.isCompleted);
    }
    
    async findOne(id) {
        
        const todoDoc = await this.model.findOne({'id': id}).exec();
        if (!todoDoc) {
        return null;
        }
        return new TodoItem(todoDoc.id, todoDoc.title, todoDoc.description, todoDoc.isCompleted);
    }

    async create(todoItem) {
        
        console.log("In Create todo Store: ",todoItem);
        
        
        const todoDoc = new this.model({
            id: todoItem.id,
            title: todoItem.title,
            description: todoItem.description,
            status: todoItem.status,
          });
          await todoDoc.save();
    }

    async update(todoItem) {
        const todoDoc = await this.model.findOne({'id': todoItem.id}).exec();
        if (!todoDoc) {
        throw new Error(`Todo item with id ${todoItem.id} not found`);
        }
        todoDoc.title = todoItem.title;
        todoDoc.description = todoItem.description;
        todoDoc.isCompleted = todoItem.isCompleted;
        await todoDoc.save();
    }
    

    async delete(id) {
        return this.model.deleteOne({'id':id});
    }
}
  
module.exports = MongoStore;
