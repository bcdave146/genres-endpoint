const mongoose = require('mongoose');
const Joi = require('joi');

// Create schema

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    phone: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 16,
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

// function validateCustomers
function validateCustomers(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(7).required(),
        isGold: Joi.boolean().required(),
    };
    
    return Joi.validate(customer, schema);
    
};

module.exports.Customer = Customer;
module.exports.validateCustomers = validateCustomers;