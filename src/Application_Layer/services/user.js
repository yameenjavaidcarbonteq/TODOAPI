const logger = require('../../Infrastructure_Layer/logger/index');
const adapter = require('../../Infrastructure_Layer/database/useradapter');
const User = require('../../Domain_Layer/entities/user');
class userService{

    constructor(storeType) {
        //services have adapter
        this.adapter = new adapter(storeType);
    }

    async find(params) {
        try {
          return await this.adapter.find(params);
        } catch (error) {
          console.error(`Error finding records: ${error.message}`);
          throw new Error(`Error finding records: ${error.message}`);
        }
      }

      async countAll(params) {
        try {
          return await this.adapter.countAll(params);
        } catch (error) {
          console.error(`Error counting items: ${error.message}`);
          throw new Error(`Error counting items: ${error.message}`);
        }
      }
      
      async findOne(params) {
        try {
          return await this.adapter.findOne({id: params});
        } catch (error) {
          console.error(`Error finding record: ${error.message}`);
          throw new Error(`Error finding record: ${error.message}`);
        }
      }
      
      async findbyid(id) {
        try {
          return await this.adapter.findbyid({id});
        } catch (error) {
          console.error(`Error finding record by ID: ${error.message}`);
          throw new Error(`Error finding record by ID: ${error.message}`);
        }
      }
      
      async create(username, email, password, createdAt) {
        try {
          
          if (!username || !password || !email) {
            throw new Error('username, password and email fields cannot be empty');
          }
          const newUser = User.create(User.makeid(), username, password, email, false, null, 'email');
          const userWithUsername = await this.adapter.find({ username });
          if (userWithUsername.length) {
            throw new Error(`User with username: ${username} already exists`);
          }
          const userWithEmail = await this.adapter.find({ email });
          if (userWithEmail.length) {
            throw new Error(`User with email: ${email} already exists`);
          }


          return await this.adapter.create(newUser);
        } catch (error) {
          console.error(`Error creating user: ${error.message}`);
          throw new Error(`Error creating user: ${error.message}`);
        }
      }
      
      async update() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          console.error(`Error updating user: ${error.message}`);
          throw new Error(`Error updating user: ${error.message}`);
        }
      }
      
      async delete() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          console.error(`Error deleting user: ${error.message}`);
          throw new Error(`Error deleting user: ${error.message}`);
        }
      }
      
}


module.exports = userService;