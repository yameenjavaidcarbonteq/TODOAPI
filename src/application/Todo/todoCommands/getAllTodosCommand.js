const { Command } = require("simple-command-bus");

class GetAllTodosCommand extends Command  {
    constructor(pageNumber, pageLimit) {
      super();
      this.pageNumber = pageNumber;
      this.pageLimit = pageLimit;
    }

    todoDetails() {
        return {
          pageNumber: this.pageNumber,
          pageLimit: this.pageLimit
        };
    }

}


module.exports = {GetAllTodosCommand};


  