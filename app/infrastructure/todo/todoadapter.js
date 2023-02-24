
const todomongoStore = require("./todomongoStore");
const todosequelizeStore = require("./todosequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceTodo');
class adapter extends store{

    constructor(storeType) {
        super();
        
        this.store = null;
        if (storeType === 'mongoose') 
        {
            this.store = new todomongoStore();
        } 
        else if (storeType === 'sequelize') 
        {
            this.store = new todosequelizeStore();
        }
    }

    async find() {
        return await this.store.find();
    }

    async findOne(id) {
        console.log("todo findone");
        return await this.store.findOne(id);
    }
    
    async findbyid(id) {
        return await this.store.findbyid(id);
    }

    async create(todoItem) {
        return await this.store.create(todoItem);
    }

    async update(todoItem) {
        return await this.store.update(todoItem);
    }

    async delete(id) {
        return await this.store.delete(id);
    }
}


module.exports = adapter;