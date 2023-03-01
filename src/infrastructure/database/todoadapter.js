
const todomongoStore = require("./mongoose/mongooseStore/todomongoStore");
const todosequelizeStore = require("./sequelize/sequelizeStore/todosequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceTodo');
class adapter extends store{

    constructor(storeType) {
        super();
        
        this.store = null;
        if (storeType === 'mongoose') 
        {
            //currently changing store to repository
            this.store = new todomongoStore();
        } 
        else if (storeType === 'sequelize') 
        {
            this.store = new todosequelizeStore();
        }
    }

    find(params) {
        return this.store.find(params);
    }
    
    countAll (params){
        return this.store.countAll(params);
    }

    findOne(params) {
        return this.store.findOne(params);
    }
    
    findbyid(id) {
        return this.store.findbyid(id);
    }

    create(todoItem) {
        return this.store.create(todoItem);
    }

    updateById(id, todoItem) {
        return this.store.updateById(id, todoItem);
    }

    delete(id) {
        return this.store.delete(id);
    }
}


module.exports = adapter;