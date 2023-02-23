const { v4: uuidv4 } = require('uuid');
const Todo = require('./domain/entities/todo')
const adapter = require('../infrastructure/todo/todoadapter');
class Store{

    constructor(database)
    { 
        this.store = new adapter(database)
    }

    async find() {
        const todos = await this.store.find();
        return todos;
    }

    async findOne(id) {
        const todoItem = await this.store.findOne(id);
        if (!todoItem) {
            return null;
        }
        return todoItem;
    }

    async findbyid(id) {
        const todoItem = await this.store.findbyid(id);
        if (!todoItem) {
            return null;
        }
        return todoItem;
    }

    async create(title, description, status) {
        
        const todoItem = Todo.create(title, description, status);
        
        await this.store.create(todoItem);
        return todoItem;
    }

    async update(todoItem) {
        return await this.store.update(todoItem);
    }

    async delete(id) {
        
        await this.store.delete(id);
    }
}

module.exports = Store;