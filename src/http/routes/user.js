const passport = require ("passport");
const {
    logger,
    database
} = require("@infrastructure");
const {
  UserController
} = require ('../controllers');

const {
  UserRepositoryFactory
} = require ('../../infrastructure/repositoryFactory');


function userRouter(express) {
  
  const router = express.Router();
  const repository = UserRepositoryFactory.getStore(database.dbtype);
  router.use(passport.authenticate("jwt", { session: false }));
  logger.info(`Injecting the repository`);
  const userController = new UserController(repository);
    

  router.post("/", userController.createUser);
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.put("/:id/edit", userController.updateUser);
  router.delete("/:id/delete", userController.deleteUser)



  return router;
}

module.exports = {userRouter};
