const logger = require('../../Infrastructure_Layer/logger/index');
const service = require('../../Application_Layer/services/user')

class UserController {
  constructor(dbRepository) {
    // this.findUsers = this.findUsers.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUserProfile = this.deleteUserProfile.bind(this);
    this.editUserProfile = this.editUserProfile.bind(this);
    // this.isEmailUsed = this.isEmailUsed.bind(this);

    this.userService = new service(dbRepository);
    
  }

  async findUser(req, res, next) {
    try {
      const user = await this.userService.findOne(req.query.id);
      if (!todo) {
        throw new Error(`No user found with id: ${req.query.id}`);
      }
      res.json(user);
    } catch (error) {
      logger.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }


  // async findUsers (req, res){
  //   const { userName, email } = req.query;
  //   const allUsers = await userData.find({});
  //   const allAvailableUsers = allUsers.filter(
  //     user =>
  //       user._id.toString() !== req.user._id.toString() &&
  //       user.visiblePublic === true
  //   );
  //   req.query.userName || req.query.email
  //     ? res.json(
  //         formatedDataArray(
  //           allAvailableUsers.filter(
  //             user =>
  //               (userName && stringContainAnother(user.userName, userName)) ||
  //               (email && user.email === email)
  //           )
  //         )
  //       )
  //     : res.json(formatedDataArray(allAvailableUsers));
  // };

  async getUserProfile (req, res) {
    
    try {
      const userProfile = await this.userService.findbyid(req.query.id);
      if (!userProfile) {
        throw new Error(`No user found with id: ${req.query.id}`);
      }
      else {
        res.json(userProfile);
      }
    } catch (error) {
      logger.error(`Error getting user by id: ${error.message}`);
      next(error);
      // res.status(error.status || 500).send(error.message);
    }
  }

  // async isUserExists (req, res) {
  //   try {
  //     const { emailAddress } = request.body;
  //     const foundedUser = await this.userService.findUser({
  //       emailAddress
  //     });
  //     if (foundedUser) {
  //       request.body.hash = foundedUser.password;
  //     }
  //     return !!foundedUser;
  //   } catch (error) {
  //     response.status(500).json({ error: error.message });
  //   }
  // };

  //Pending
  // async isEmailUsed(req, res, next) {
  //   if (await isUserExists(req)) {
  //     res.status(500).json({
  //       error: `This e-mail address ${req.body.email} was used!`
  //     });
  //   } else {
  //     next();
  //   }
  // }

  async getAllUsers(req, res) {
    try 
    {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } 
    catch (error) {
      logger.error(`Error getting users: ${error.message}`);
      next(error);
    }
  }

  async deleteUserProfile (req, res) {
    try {
      await this.userService.deleteUserProfile(req.query.id);
      res.json('user successfully deleted!');
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      next(error);
    }
  }
  
  async editUserProfile (req, res) {
    try {
      const { username, email, password, isVerified, googleId, provider} = req.body;
      const message = await this.userService.editUserProfile(
        req.query.id,
        req.user.id,
        username,
        email,
        password,
        isVerified,
        googleId,
        provider
      );
      res.json(message);
      
      
      
      
      // const user = await userData.findById(req.query.id);
      // if (user) {
      //   const editedUser = await userData.findByIdAndUpdate(
      //     user._id,
      //     req.body,
      //     { runValidators: true }
      //   );
      //   res.json(formatedData(editedUser));
      // } else {
        // throw { message: "User doesn't exist!", status: 404 };
      // }
    } catch (error) {
      res.status(error.ststus || 500).send(error.message);
    }
  }
}


module.exports = UserController;