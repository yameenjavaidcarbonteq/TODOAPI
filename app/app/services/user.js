
const usermongoStore = require("./usermongoStore");
const usersequelizeStore = require("./usersequelizeStore");

class userService{

    constructor(storeType) {
        
        this.store = new this.adapter(storeType);
    }

    async find() {
        return await this.store.find();
    }

    async findOne(query) {
        console.log("Came here: ",query);
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


module.exports = userService;