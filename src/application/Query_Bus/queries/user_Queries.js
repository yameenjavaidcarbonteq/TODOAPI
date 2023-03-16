

class FindUserQuery {
    constructor(params) {
      this.params = params;
    }
}
  
class GetUserQuery {
    constructor(params) {
      this.params = params;
    }
}
  
class GetAllUsersQuery {}
  

module.exports = {
    
  FindUserQuery,
  GetUserQuery,
  GetAllUsersQuery,
    
}