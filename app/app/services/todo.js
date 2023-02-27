
const todomongoStore = require("./todomongoStore");
const todosequelizeStore = require("./todosequelizeStore");
const adapter = require


class todoService{

    constructor(storeType) {
        this.dbModel = new adapter(storeType);
    }

    async findAll() {
        
        const todos = await this.dbModel.find();
        const todoEntities =  todos.map((todoRecord) => Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted));
        return todoEntities;
    }

    async findOne(id) {
        const todoRecord = await this.dbModel.findOne(id);

        if (!todoItem) 
        {
            return { error: `Todo item with id ${id} not found` };
        } 
        else 
        {
            const todoEntity = Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted);
            return todoEntity;
        }
    }
    
    async findbyid(id) {
        const todoRecord = await this.dbModel.findOne(id);

        if (!todoItem) 
        {
            return { error: `Todo item with id ${id} not found` };
        } 
        else 
        {
            const todoEntity = Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted);
            return todoEntity;
        }
    }

    create(title, description, status) {
        if (!title || !description) {
            throw new Error('title and description fields cannot be empty');
        }
        const todoItem = Todo.create(Todo.makeid(),title, description, status);
        return postRepository.create(todoItem);
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
        
          return postRepository.findById(id).then((foundPost) => {
            if (!foundPost) {
              throw new Error(`No post found with id: ${id}`);
            }
            return postRepository.updateById(id, updatedPost);
          });
        
    }

    async delete(id) {
        return postRepository.findById(id).then((post) => {
            if (!post) {
              throw new Error(`No post found with id: ${id}`);
            }
            return postRepository.deleteById(id);
          });
    }
}


module.exports = todoService;