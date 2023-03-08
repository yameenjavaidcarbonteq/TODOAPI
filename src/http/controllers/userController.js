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
      const params = {};
      const response = {};

      // Dynamically created query params based on endpoint params
      for (const key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
          params[key] = req.query[key];
        }
      }
      // predefined query params (apart from dynamically) for pagination
      params.pageNumber = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
      params.pageLimit = params.pageLimit ? parseInt(params.pageLimit, 10) : 10;

      

      // calling services here
      const users = await this.service.find(params);
      response.users = users;
      // calling services here
      const totalItems = await this.service.countAll(params);
      response.totalItems = totalItems;
      response.totalPages = Math.ceil(totalItems / params.pageLimit);
      response.itemsPerPage = params.pageLimit;
      res.json(response);
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