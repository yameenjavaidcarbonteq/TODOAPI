
const usermongoStore = require("../../infrastructure/user/usermongoStore");
const usersequelizeStore = require("../../infrastructure/user/usersequelizeStore");

const store = require('./storeInterfaceUser');
class adapter extends store{

    constructor(storeType) {
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