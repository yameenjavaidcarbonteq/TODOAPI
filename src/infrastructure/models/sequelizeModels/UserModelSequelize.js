const {config} = require ("@config");
const bcrypt = require ("bcrypt");
const db = config;

const Sequelize = require ("sequelize");

const sequelize = new Sequelize(config.seq_database, config.seq_username, config.seq_password, {
  host: config.seq_host,
  dialect: config.seq_dialect
});
const UserModelSequelize = sequelize.define('Users', 
{
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    required: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  provider: {
    type: Sequelize.STRING,
    required: true,
  }
}
,{
  hooks: 
  {
    beforeCreate: async (user) => 
    {
      if(user.password != null){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
  ,
  timestamps: false  
});

UserModelSequelize.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



//  sequelize.sync({ force: true }).then(() => {
//    logger.info('Tables created or updated');
//  });

/*
    The sequelize.sync() method in Sequelize is used to create or update the database schema to match 
    the defined models. It ensures that the database tables and columns exist for the defined models 
    and that they match the structure defined in the models.

    The sync() method takes an optional configuration object that allows you to specify how the synchronization 
    should be performed. For example, you can use the force option to drop the existing tables and recreate them 
    = require  scratch, or you can use the alter option to modify the existing tables to match the models without 
    dropping them.

*/

module.exports = {
  UserModelSequelize
};
