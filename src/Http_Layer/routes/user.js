const UserController = require('../controllers/userController');

const userRepositoryAdapter = require ('../../Infrastructure_Layer/database/useradapter');
const config = require ('../../Infrastructure_Layer/config/index');

const passport = require("passport");

function userRouter(express) {
  
  const router = express.Router();
  // load userController with dependencies
  const userController = new UserController(
    new userRepositoryAdapter(config.dbtype)
  );
  
  
  router.use(passport.authenticate("jwt", { session: false }));
  
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserProfile);
  router.put("/:id", userController.editUserProfile);
  router.delete("/:id", userController.deleteUserProfile)



  return router;
}

module.exports = userRouter;
