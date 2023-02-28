const store = require('../../../../domain/interfaces/storeInterfaceTodo');
const todoMongo = require('../../infrastructure/mongo_models/todo');
const Todo =  require('../../../../domain/entities/todo');


class MongoStore extends store{
    constructor() {
        super();
        this.model = todoMongo;
    }   

    async find() {
        PostModel.find(omit(params, 'page', 'perPage'))
        .skip(params.perPage * params.page - params.perPage)
        .limit(params.perPage);
    }

    countAll (params){
        PostModel.countDocuments(omit(params, 'page', 'perPage'));
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
        
        const newTodo = new PostModel({
            id: todoItem.id,
            title: todoItem.title,
            description: todoItemdescription,
            status: todoItem.status,
            createdAt: new Date,            
            userId: todoItem.getUserId()
          });
      
        return newTodo.save();
    }
    

    update(todoItem) {
        const updatedTodo = {
            title: todoItem.getTitle(),
            description: todoItem.getDescription(),
            isPublished: todoItem.isPublished()
        };
      
        return this.model.findOneAndUpdate(
            { _id: id },
            { $set: updatedTodo },
            { new: true }
        );
    }
    

    async delete(id) {
        return this.model.deleteOne({'id':id});
    }
}
  
module.exports = MongoStore;
