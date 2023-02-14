
class Controller {
    constructor() {
        this.router = express.Router();
    }
    
    static create(type) {
      if (type === 'todo') {
        return new TodoController();
      } else if (type === 'user') {
        return new UserController();
      } else {
        throw new Error('Invalid type');
      }
    }
  }

module.exports = Controller;