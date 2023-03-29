const {logger} = require ('@logger');
const {UserEntity} = require ('@domain');

const userEventsListner = require("../events/userEvent");

const {
  InvalidUserDataError,
  UserAlreadyExistError,
  UserNotFoundError,
  InternalServerError,
  UnAuthorizedError,
  UnExpextedDatabaseError
} = require ('../../http/errors/appError');

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
      
      
      const newUser = UserEntity.createFromParams(params);
      let query = {
        username: params.username
      }
      let exists = await this.userRepository.find(query);
      
      if (exists) {
        throw new UserAlreadyExistError(400, `User with username: ${params.username} already exists`);
      }
      query = {
        email: params.email
      }
      exists = await this.userRepository.find(query);
      if (exists) {
        throw new UserAlreadyExistError(400, `User with email: ${params.email} already exists`);
      }

      const result = await this.userRepository.create(newUser);
      userEventsListner.emit('userCreated', result);
      return result;
    }
      
    async update(params) {
      const updatedUser = UserEntity.createFromParams(params);
      const result = await this.userRepository.update(updatedUser);
      if (result) {
        userEventsListner.emit('userUpdated', result);
        return result;
      } 
      else {
        throw new UnExpextedDatabaseError(400, "User not Found.");
      }
    }
    
    async delete(params) {
      const user = await this.userRepository.findbyId(params.id);
      if(!user)
      {
        throw new UserNotFoundError(400, "User not Found.");
      }
      else
      {
        const userItem = UserEntity.createFromObject(user);
        return await this.userRepository.delete(userItem);
      }
    }
      
}

module.exports = {
  UserService
};
