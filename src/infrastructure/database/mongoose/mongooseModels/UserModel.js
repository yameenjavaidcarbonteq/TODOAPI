const mongoose from'mongoose');
const bcrypt from'bcrypt');
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
  isVerified: {
      type: Boolean,
      default: false,
  },
  googleId: {
      type: String,
  },
  provider: {
      type: String,
      required: true,
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

const User = mongoose.model('user', userSchema);

module.exports = User;