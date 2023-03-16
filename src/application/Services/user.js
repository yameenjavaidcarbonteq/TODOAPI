import logger from'@logger';
import User from'@domain/Entities/user';
export class userService{

    constructor(userRepository) {
        //services have adapter
        this.userRepository = userRepository;
    }

    async find(query) {
      try {
        return await this.userRepository.find(query);
      } catch (error) {
        logger.error(`Error finding records: ${error.message}`);
        throw new Error(`Error finding records: ${error.message}`);
      }
    }
    async findOne(query) {
      try {
        return await this.userRepository.findOne(query);
      } catch (error) {
        logger.error(`Error finding records: ${error.message}`);
        throw new Error(`Error finding records: ${error.message}`);
      }
    }

    async create(username, email, password, isVerified, googleId, provider) {
      try {
        
        let query = {};
        
        if (!username || !password || !email) {
          throw new Error('username, password and email fields cannot be empty');
        }
        const newUser = User.create(User.makeid(), username, email, password, isVerified, googleId, provider);
        query.username = username;
        const userWithUsername = await this.userRepository.find(query);
        
        logger.info(userWithUsername);
        
        if (userWithUsername.length) {
          throw new Error(`User with username: ${username} already exists`);
        }
        const userWithEmail = await this.userRepository.find({ email });
        if (userWithEmail.length) {
          throw new Error(`User with email: ${email} already exists`);
        }


        return await this.userRepository.create(newUser);
      } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
      
      async update() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          logger.error(`Error updating user: ${error.message}`);
          throw new Error(`Error updating user: ${error.message}`);
        }
      }
      
      async delete() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          logger.error(`Error deleting user: ${error.message}`);
          throw new Error(`Error deleting user: ${error.message}`);
        }
      }
      
}
