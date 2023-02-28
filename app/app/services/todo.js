
const todomongoStore = require("./todomongoStore");
const todosequelizeStore = require("./todosequelizeStore");
const adapter = require


class todoService{

    constructor(storeType) {
        this.adapter = new adapter(storeType);
    }

    create(title, description, status, userID, todoRepository) {
        if (!title || !description) {
            throw new Error('title and description fields cannot be empty');
        }
        const todoItem = Todo.create(Todo.makeid(),title, description, status);
        return this.adapter.create(todoItem);
    }

    findAll() {
        
        // const todos = await this.dbModel.find();
        // const todoEntities =  todos.map((todoRecord) => Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted));
        // return todoEntities;

        return this.adapter.findAll(params);
    }

    async findOne(id) {
        // const todoRecord = await this.dbModel.findOne(id);

        // if (!todoItem) 
        // {
        //     return { error: `Todo item with id ${id} not found` };
        // } 
        // else 
        // {
        //     const todoEntity = Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted);
        //     return todoEntity;
        // }

        return this.adapter.findById(id);
    }
    
    async findbyid(id) {
        // const todoRecord = await this.dbModel.findOne(id);

        // if (!todoItem) 
        // {
        //     return { error: `Todo item with id ${id} not found` };
        // } 
        // else 
        // {
        //     const todoEntity = Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted);
        //     return todoEntity;
        // }
        return this.adapter.findById(id);
    }
    
    update(id,userId,title,description,status,dbRepository) {
        
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

    async delete(id) {
        return this.adapter.findById(id).then((post) => {
            if (!post) {
              throw new Error(`No post found with id: ${id}`);
            }
            return this.adapter.deleteById(id);
          });
    }
}


module.exports = todoService;