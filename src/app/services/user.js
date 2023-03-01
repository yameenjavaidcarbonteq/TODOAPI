const adapter = require('../../infrastructure/database/useradapter');
const User = require('../../domain/entities/user');
class userService{

    constructor(storeType) {
        //services have adapter
        this.store = new adapter(storeType);
    }

    async find() {
        return await this.store.find();
    }

    async findOne(params) {
        return this.store.findByOne(params);
    }

    async findbyid(id) {
        return this.store.findById(id);
    }

    async create(username, password, email, createdAt) {
        
        if (!username || !password || !email) {
            throw new Error('username, password and email fields cannot be empty');
        }
        
        const newUser = User.create(User.makeid(), username, password, email, false, null, 'email', createdAt);
        
        return this.store
            .findByProperty({ username })
            .then((userWithUsername) => {
            if (userWithUsername.length) {
                throw new Error(`User with username: ${username} already exists`);
            }
            return this.store.findByProperty({ email });})
            .then((userWithEmail) => {
              if (userWithEmail.length) {
                throw new Error(`User with email: ${email} already exists`);
              }
              return this.store.add(newUser);
            });
    }

    async update() {
        // Throw not Implemented
    }

    async delete() {
        // Throw not Implemented
    }
}


module.exports = userService;