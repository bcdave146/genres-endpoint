const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

// User document

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: { type: Boolean },
  // roles: [],
  // operations: []
});

// Information Expert Principle
// NB CAN NOT USE () => function as 'this' can not be used need to define a function() to call
// Can add a method to object to be used when calling to generate a auth Token to use in header field x-auth-token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// function validateUser
function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
