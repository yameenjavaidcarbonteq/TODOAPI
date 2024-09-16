const mongoose = require  ('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
  },
  password: {
      type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: 'Date',
    default: Date.now
  }
}, {
  versionKey: false,
  id: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (this.password === null)
  {
    next();  
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next();
});

userSchema.methods.validPassword = async function (password) {
  if(this.password === null)
    return true;
  return await bcrypt.compare(password, this.password);
};

const UserModelMongoose = mongoose.model('user', userSchema);

module.exports = UserModelMongoose;
