const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })

// Hash the provided password when a user creates an account, or tries to login
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// checks to see if provided password matches password in the database
userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this.generateHash(this.password)
  };

  // Move on to the next piece of middleware 
  next();
})

const User = mongoose.model('User', userSchema)
module.exports = User