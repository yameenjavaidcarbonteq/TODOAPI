import addUser from '../../application/use_cases/user/add';
import findByProperty from '../../application/use_cases/user/findByProperty';
import countAll from '../../application/use_cases/user/countAll';
import findById from '../../application/use_cases/user/findById';

class UserController{
  constructor()
  {
    this.fetchUsersByProperty = this.fetchUsersByProperty.bind();
    this.fetchUserById = this.fetchUserById.bind();
    this.addNewUser = this.addNewUser.bind();
    
    this.service = new service(config.dbtype);
    
  }
  
  fetchUsersByProperty (req, res, next){
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

    findByProperty(params, dbRepository)
      .then((users) => {
        response.users = users;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  fetchUserById (req, res, next) {
    findById(req.params.id, dbRepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  addNewUser (req, res, next){
    const { username, password, email, createdAt } = req.body;
    addUser(
      username,
      password,
      email,
      createdAt,
      dbRepository,
      authService
    )
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };
}

module.exports = UserController;