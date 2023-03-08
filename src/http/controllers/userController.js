const logger = require('../../infrastructure/logger/index');
const Service = require('../../app/services/user');
const config = require('../../infrastructure/config/index');

class UserController {
  constructor() {
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);

    this.service = new Service(config.dbtype);
  }

  async find(req, res, next) {
    try {
      // calling services here
      const users = await this.service.find(params);
      const totalItems = await this.service.countAll(params);
      res.json({
        "Users": users,
        "TotalUsers": totalItems
      });
    } catch (error) {
      console.error(`Error fetching users by property: ${error.message}`);
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const user = await this.service.findOne(req.params.id);
      res.json(user);
    } catch (error) {
      console.error(`Error fetching user by id: ${error.message}`);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const user = await this.service.create(username, password, email);
      res.json(user);
    } catch (error) {
      console.error(`Error adding new user: ${error.message}`);
      next(error);
    }
  }
}


module.exports = UserController;