const store = require('../../domain/interfaces/storeInterfaceUser');
const userMongo = require('../mongo_models/user');
const UserEntity =  require('../../domain/entities/user');


class MongoStore extends store{
    constructor() {
        super();
        this.model = userMongo;
    }   

    async find() {
        // Not Implemented
    }

    async findOne(email) {
        const userDoc = await this.model.findOne(email).exec();
        if (!userDoc) {
            return null;
        }
        console.log(userDoc);
        
        const temp =  new UserEntity(userDoc.id, userDoc.username, userDoc.password, userDoc.email, userDoc.isVerified, userDoc.googleId, userDoc.provider);
        return userDoc;
    }

    async findbyid(id) {
        
        const userDoc = await this.model.findOne(id).exec();
        if (!userDoc) {
            return null;
        }
        const temp =  new UserEntity(userDoc.id, userDoc.username, userDoc.password, userDoc.email, userDoc.isVerified, userDoc.googleId, userDoc.provider);
        return temp;
    }

    async create(UserEntity) {
        console.log("Creating New User: ", UserEntity );
        const userDoc = new this.model({
            id: UserEntity.id,
            username: UserEntity.username,
            email: UserEntity.email,
            password: UserEntity.password,
            isVerified: UserEntity.isVerified,
            googleId: UserEntity.googleId,
            provider: UserEntity.provider,
          });
          await userDoc.save();
    }

    async update(UserEntity) {
        // Not Implemented
    }
    

    async delete(id) {
        // Not Implemented
    }
}
  
module.exports = MongoStore;
