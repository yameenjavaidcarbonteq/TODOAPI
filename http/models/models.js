class Model {
    static create(type) {
      if (type === 'todo') {
        return new TodoModel();
      } else if (type === 'user') {
        return new UserModel();
      } else {
        throw new Error('Invalid type');
      }
    }
  }