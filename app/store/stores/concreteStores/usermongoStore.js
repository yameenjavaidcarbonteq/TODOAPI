const store = require('../Store');
const userMongo = require('../../../infrastructure/mongo_models/user');

const userStore = require('../../../domain/entities/user');

class MongoStore extends store{
    constructor() {
        super();
        this.model = userMongo;
    }   

    async find(query) {
        return this.model.find(query);
    }

    async findOne(query) {
        return this.model.findOne(query);
    }

    async create(data) {
        const instance = new this.model(data);
        return instance;
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}
  
module.exports = MongoStore;
