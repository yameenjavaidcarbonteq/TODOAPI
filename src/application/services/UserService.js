const {logger} = require ('@logger');
const {UserEntity} = require ('@domain');
class UserService{

    constructor(userRepository) {
        //services have adapter
        this.userRepository = userRepository;
    }

    async find(params) {
    
      return await this.userRepository.find(params);
    }
    async findbyId(params) {
      return await this.userRepository.findbyId(params.id);
    }

    async findbyEmail(params) {
      return await this.userRepository.findbyEmail(params.email);
    }

    async create(params) {
      
      try {
        const newUser = UserEntity.createFromParams(params);
        let query = {
          username: params.username
        }
        let exists = await this.userRepository.find(query);
        
        console.log(exists);
        if (exists) {
          throw new Error(`User with username: ${params.username} already exists`);
        }
        query = {
          email: params.email
        }
        exists = await this.userRepository.find(query);
        if (exists) {
          throw new Error(`User with email: ${params.email} already exists`);
        }

        console.log(newUser);
        return await this.userRepository.create(newUser);
      } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
      
    async update(params) {
      const updatedUser = UserEntity.createFromParams(params);
      return await this.userRepository.update(updatedUser.id, updatedUser);
    }
    
    async delete(params) {
      const user = await this.userRepository.findbyId(params.id);
      if(!user)
      {
        throw ("user not found");
      }
      else
      {
        const userItem = UserEntity.createFromObject(user);
        await this.userRepository.delete(userItem);
      }
    }
      
}

module.exports = {
  UserService
};
