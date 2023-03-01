const adapter = require('../../infrastructure/database/todoadapter');
const Todo = require('../../domain/entities/todo');
class todoService{

    constructor(storeType) {
        //services have adapter
        this.adapter = new adapter(storeType);
    }

    countAll (params){
        return this.adapter.countAll(params);
    }
    
    
    create(title, description, status, userId) {
        if (!title || !description) {
            throw new Error('title and description fields cannot be empty');
        }
        const todoItem = Todo.create(Todo.makeid(),title, description, status, userId);
        return this.adapter.create(todoItem);
    }

    findAll(params) {
        console.log(params);
        return this.adapter.find(params);
    }

    findOne(id) {
        return this.adapter.findOne(id);
    }
    
    findbyid(id) {
        return this.adapter.findById(id);
    }
    
    update(id,userId,title,description,status) {
        
        if (!title || !description) {
            throw new Error('title and description fields are mandatory');
          }
        const updatedPost = post({
            title,
            description,
            status,
            userId
        });
    
        return this.adapter.findById(id).then((foundPost) => {
        if (!foundPost) {
            throw new Error(`No post found with id: ${id}`);
        }
        return this.adapter.updateById(id, updatedPost);
        });
        
    }

    delete(id) {
        return this.adapter.findById(id).then((todo) => {
            if (!todo) {
              throw new Error(`No post found with id: ${id}`);
            }
            return this.adapter.deleteById(id);
        });
    }
}


module.exports = todoService;