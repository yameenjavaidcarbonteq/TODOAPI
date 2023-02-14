class Service {
    static create(type) {
      if (type === 'todo') {
        return new TodoService();
      } else if (type === 'user') {
        return new UserService();
      } else {
        throw new Error('Invalid type');
      }
    }
  }