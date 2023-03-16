const UserController from'../controllers/userController');

const userRepositoryAdapter from ('@infrastructure/database/UserAdapter');
const config from ('@infrastructure/config');

const passport from"passport");

function userRouter(express) {
  
  const router = express.Router();
  // load userController with dependencies
  const userController = new UserController(
    new userRepositoryAdapter(config.dbtype)
  );
  
  
  // router.use(passport.authenticate("jwt", { session: false }));
  
  router.post("/", userController.createUser);
  router.post("/", userController.findUser);
  
  router.get("/:id", userController.getUser);
  router.get("/", userController.getAllUsers);
  
  router.put("/:id", userController.editUser);
  router.delete("/:id", userController.deleteUser)



  return router;
}

module.exports = userRouter;
