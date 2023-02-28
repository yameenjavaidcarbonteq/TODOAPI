const store = require('../../domain/interfaces/storeInterfaceUser');
const userMongo = require('../mongo_models/user');
const User =  require('../../domain/entities/user');


class MongoStore extends store{
    constructor() {
        super();
        this.model = userMongo;
    }   

    async find() {
        PostModel.find(omit(params, 'page', 'perPage'))
        .skip(params.perPage * params.page - params.perPage)
        .limit(params.perPage);
    }

    findByProperty = (params) =>
        UserModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    countAll (params){
        UserModel.countDocuments(omit(params, 'page', 'perPage'));
    }
    findOneByProperty(param) {
        
        this.model.findOne(param).exec();
    }
    findbyid(id) {
        
        this.model.findById(id).select('-password');
    }

    create(User) {
        const userDoc = new this.model({
            id: User.id,
            username: User.username,
            email: User.email,
            password: User.password,
            isVerified: User.isVerified,
            googleId: User.googleId,
            provider: User.provider,
            createdAt: new Date(),
          });
        return userDoc.save();
    }

    async update(User) {
        // Not Implemented
    }
    

    async delete(id) {
        // Not Implemented
    }
}
  
module.exports = MongoStore;
