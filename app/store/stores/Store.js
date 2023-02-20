const { v4: uuidv4 } = require('uuid');
class Store{

  //This is an Interface
  constructor()
  { 
    
  }

  async find (query) {
    
  };

  async findOne (query) {
    
  };
  
  async create (data) {
    const temp = data;
    temp.id = uuidv4();
    return temp;
  };

  async update (id, data) {
    
  };

  async delete (id) {
    
  };
}

module.exports = Store;