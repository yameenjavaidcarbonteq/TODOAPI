const store = require('../Store');
const userSeq = require('../../../infrastructure/sequelize_models/user');

const userStore = require('../../../domain/entities/user');

class sequelizeStore extends store{
    constructor() {
      super();  
      this.model = userSeq;
    }
    
    async find(query) {
      return this.model.findAll({ where: query });
    }
  
    async findOne(query) {
      return this.model.findOne({ where: query });
    }
  
    async create(data) {
      return this.model.create(data);
    }
  
    async update(id, data) {
      const instance = await this.model.findByPk(id);
      if (!instance) throw new Error('Instance not found');
      return instance.update(data);
    }
  
    async delete(id) {
      const instance = await this.model.findByPk(id);
      if (!instance) throw new Error('Instance not found');
      return instance.destroy();
    }
  }
  
module.exports = sequelizeStore;
