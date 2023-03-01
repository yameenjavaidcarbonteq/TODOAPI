
const usermongoStore = require("./mongoose/mongooseStore/usermongoStore");
const usersequelizeStore = require("./sequelize/sequelizeStore/usersequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceUser');
class adapter extends store{

    constructor(storeType) {
        
        // console.log("Creating new adapter for dbtype: ",storeType);
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

    find() {
        return this.store.find();
    }

    findByProperty() {
        return this.store.findByProperty();
    }

    countAll (params){
        return this.store.countAll(params);
    }

    findOne(query) {
        console.log("Came In Hrereerwerwer");
        return this.store.findOne(query);
    }

    findbyid(id) {
        return this.store.findbyid(id);
    }

    create(userItem) {
        return this.store.create(userItem);
    }

    updateById(id, userItem) {
        // return this.store.update(userItem);
    }

    delete(id) {
        // return this.store.delete(id);
    }
}


module.exports = adapter;