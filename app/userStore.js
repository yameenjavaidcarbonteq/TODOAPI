const { v4: uuidv4 } = require('uuid');
const User = require('./domain/entities/user')
const adapter = require('../infrastructure/user/adapter');
class Store{

    constructor(database)
    { 
        this.store = new adapter(database)
    }

    async find() {
        // Not Implemented
    }

    async findbyid(id) {
        const userEntity = await this.store.findbyid(id);
        if (!userEntity) {
            return null;
        }
        return userEntity;
    }
    
    async findOne(query) {
        const userEntity = await this.store.findOne(query);
        console.log("In Store Find One :",userEntity);
        if (!userEntity) {
            return null;
        }
        return userEntity;
    }

    async create(email, password, username, isVerified, googleId, provider) {
        const userEntity = User.create(username, password, email, isVerified, googleId, provider);
        await this.store.create(userEntity);
        return userEntity;
    }

    async update(userEntity) {
        // Not Implemented
    }

    async delete(id) {
        // Not Implemented
    }
}

module.exports = Store;