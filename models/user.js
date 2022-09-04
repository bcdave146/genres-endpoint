const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity"); 

// User document

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    // roles: [],
    // operations: []
});

// Information Expert Principle
// NB CAN NOT USE () => function as 'this' can not be used
// Can add a method to object to be used when calling 
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

// set password complexityOptions options
const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };
  const label = "Password";

// function validateUser
function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        //password: new passwordComplexity(complexityOptions, label).validate(user.password)
    };
    
    return Joi.validate(user, schema);
    
};

module.exports.User = User;
module.exports.validateUser = validateUser;
