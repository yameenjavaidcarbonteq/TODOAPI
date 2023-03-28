const { Command } = require("simple-command-bus");

class GetAllUsersCommand extends Command  {
    constructor() {
      super();
      
    }
    userDetails() {
        return {
          
        };
    }

}


module.exports = {
  GetAllUsersCommand
};


  