const store = require('../../../../domain/interfaces/storeInterfaceUser');
const userMongo = require('../mongo_models/user');


class MongoStore extends store{
    constructor() {
        super();
        this.model = userMongo;
    }   
    omit(obj, ...props) {
        const result = { ...obj };
        props.forEach((prop) => delete result[prop]);
        return result;
    }

    find(params) {
        this.model.find(this.omit(params, 'page', 'perPage'))
        .skip(params.perPage * params.page - params.perPage)
        .limit(params.perPage);
    }

    findByProperty (params) {
        this.model.find(this.omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);
    }
    countAll (params){
        this.model.countDocuments(this.omit(params, 'page', 'perPage'));
    }
    findOne(param) {
        
        console.log("asdasdasdasdasdasd");
        return this.model.findOne(param);
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
