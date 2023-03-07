const logger = require('../../infrastructure/logger/index');
const Service = require('../../app/services/user');
const config = require('../../infrastructure/config/index');


const stringContainAnother = (mainString, checkedString) =>
  !!(mainString.toLocaleLowerCase().indexOf(checkedString) > -1);





class UserController {
  constructor() {
    this.findUsers = this.findUsers.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUserProfile = this.deleteUserProfile.bind(this);
    this.editUserProfile = this.editUserProfile.bind(this);
    this.isEmailUsed = this.isEmailUsed.bind(this);


    this.service = new Service(config.dbtype);
  }

  async findUsers (req, res){
    const { userName, email } = req.query;
    const allUsers = await userData.find({});
    const allAvailableUsers = allUsers.filter(
      user =>
        user._id.toString() !== req.user._id.toString() &&
        user.visiblePublic === true
    );
    req.query.userName || req.query.email
      ? res.json(
          formatedDataArray(
            allAvailableUsers.filter(
              user =>
                (userName && stringContainAnother(user.userName, userName)) ||
                (email && user.email === email)
            )
          )
        )
      : res.json(formatedDataArray(allAvailableUsers));
  };

  async getUserProfile (req, res) {
    try {
      const userProfile = await userData.findById(req.params.id);
      if (!userProfile) {
        throw { message: "User doesn't exist", status: 404 };
      } else {
        res.json(formatedData(userProfile));
      }
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
  
  async isEmailUsed(req, res, next) {
    if (await isUserExists(req)) {
      res.status(500).json({
        error: `This e-mail address ${req.body.email} was used!`
      });
    } else {
      next();
    }
  }

  async getAllUsers(req, res) {
    userSensitiveDataSchema.find({}).then(users => {
      const usersList = users.map(user => userDataToShow(user));
      res.json(usersList);
    });
  }

  async deleteUserProfile (req, res) {
    userSensitiveDataSchema.findOneAndDelete({_id: req.params.id}, () => res.json({message: `User has been deleted!`}))
    try {
      await this.service.delete(req.params.id);
      res.json('post successfully deleted!');
    } catch (error) {
      console.error(`Error deleting todo: ${error.message}`);
      next(error);
    }
  
  }
  
  async editUserProfile (req, res) {
    try {
      const user = await userData.findById(req.params.id);
      if (user) {
        const editedUser = await userData.findByIdAndUpdate(
          user._id,
          req.body,
          { runValidators: true }
        );
        res.json(formatedData(editedUser));
      } else {
        throw { message: "User doesn't exist!", status: 404 };
      }
    } catch (error) {
      res.status(error.ststus || 500).send(error.message);
    }
  }
}


module.exports = UserController;