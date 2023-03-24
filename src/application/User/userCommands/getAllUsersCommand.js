const { Command } = require("simple-command-bus");

class GetAllUsersCommand extends Command  {
    constructor(pageNumber, pageLimit) {
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


  