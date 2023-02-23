
const usermongoStore = require("./usermongoStore");
const usersequelizeStore = require("./usersequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceUser');
class adapter extends store{

    constructor(storeType) {
        
        console.log("Creating new adapter for dbtype: ",storeType);
        super();
        
        this.store = null;
        if (storeType === 'mongoose') 
        {
            this.store = new usermongoStore();
        } 
        else if (storeType === 'sequelize') 
        {
            this.store = new usersequelizeStore();
        }
    }

    async find() {
        return await this.store.find();
    }

    async findOne(query) {
        return await this.store.findOne(query);
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