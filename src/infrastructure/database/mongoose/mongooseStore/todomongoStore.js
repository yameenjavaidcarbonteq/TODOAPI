const store = require('../../../../domain/interfaces/storeInterfaceTodo');
const todoMongo = require('../mongo_models/todo');


class MongoStore extends store{
    constructor() {
        super();
        this.model = todoMongo;
    }   

    omit(obj, ...props) {
        const result = { ...obj };
        props.forEach((prop) => delete result[prop]);
        return result;
    }

    find(params) {
        console.log(params);
        return this.model.find(this.omit(params, 'page', 'perPage'))
        .skip(params.perPage * params.page - params.perPage)
        .limit(params.perPage);
    }

    countAll (params){
        this.model.countDocuments(this.omit(params, 'page', 'perPage'));
    }
    
    findbyid(id) {
        
        this.model.findById(id);
    }
    
    findOne(id) {
        
        this.model.findById(id);
    }

    create(todoItem) {
        
        const newTodo = new this.model({
            id: todoItem.id,
            title: todoItem.title,
            description: todoItemdescription,
            status: todoItem.status,
            createdAt: new Date,            
            userId: todoItem.getUserId()
          });
      
        return newTodo.save();
    }
    

    updateById(id, todoItem) {
        const updatedTodo = {
            title: todoItem.title,
            description: todoItem.description,
            status: todoItem.status
        };
      
        return this.model.findOneAndUpdate(
            { _id: id },
            { $set: updatedTodo },
            { new: true }
        );
    }
    

    async delete(id) {
        this.model.findByIdAndRemove(id);
    }
}
  
module.exports = MongoStore;
