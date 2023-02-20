
const usermongoStore = require("./concreteStores/usermongoStore");
const usersequelizeStore = require("./concreteStores/usersequelizeStore");
const todomongoStore = require("./concreteStores/todomongoStore");
const todosequelizeStore = require("./concreteStores/todosequelizeStore");

const store = require('./Store');
class adapter extends store{

    constructor(storeType,whichStore) {
        super();
        
        this.store = null;
        if (storeType === 'mongoose') 
        {
            console.log("Creating Mongoose Adapter");
            if(whichStore === 'todo')
                this.store = new todomongoStore();
            else if(whichStore === 'user')
                this.store = new usermongoStore();
        } 
        else if (storeType === 'sequelize') 
        {
            console.log("Creating Sequelize Adapter");
            if(whichStore === 'todo')
                this.store = new todosequelizeStore();
            else if(whichStore === 'user')
                this.store = new usersequelizeStore();
        }
    }

    async find(query) {
        return this.store.find(query);
    }

    async findOne(query) {
        return this.store.findOne(query);
    }

    async create(data) {
        data = super.create(data);
        return this.store.create(data);
    }

    async update(id, data) {
        return this.store.update(id, data);
    }

    async delete(id) {
        return this.store.delete(id);
    }
}


module.exports = adapter;