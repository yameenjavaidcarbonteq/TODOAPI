const UserController = require('../controllers/userController');

const userRepositoryAdapter = require ('../../Infrastructure_Layer/database/useradapter');
const config = require ('../../Infrastructure_Layer/config');

const passport = require("passport");

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
