const store = require('../../domain/interfaces/storeInterfaceUser');
const userMongo = require('../mongo_models/user');
const User =  require('../../domain/entities/user');


class MongoStore extends store{
    constructor() {
        super();
        this.model = userMongo;
    }   

    async find() {
        // Not Implemented
    }

    async findOne(email) {
        console.log("FindOne called for ",email);
        const userDoc = await this.model.findOne(email).exec();
        if (!userDoc) {
            return null;
        }
        return userDoc;
    }

    async findbyid(id) {
        
        const userDoc = await this.model.findOne(id).exec();
        if (!userDoc) {
            return null;
        }
        return userDoc;
    }

    async create(User) {
        const userDoc = new this.model({
            id: User.id,
            username: User.username,
            email: User.email,
            password: User.password,
            isVerified: User.isVerified,
            googleId: User.googleId,
            provider: User.provider,
          });
        await userDoc.save();
    }

    async update(User) {
        // Not Implemented
    }
    

    async delete(id) {
        // Not Implemented
    }
}
  
module.exports = MongoStore;
