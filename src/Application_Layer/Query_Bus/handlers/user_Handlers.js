
class FindUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(query) {
      
      console.log("This is the parametre:" , query.query);
      const user = await this.userService.findOne(query.params);
      if (!user) {
        throw new Error(`No user found with id: ${query}`);
      }
      return user;
    }
}
  
class GetUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(query) {
      const user = await this.userService.findbyid(query.params);
      if (!user) {
        throw new Error(`No user found with id: ${query}`);
      }
      return user;
    }
}
  
class GetAllUsersHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle() {
      const users = await this.userService.find({});
      return users;
    }
}
  
module.exports = {
  FindUserHandler,
  GetUserHandler,
  GetAllUsersHandler,
}