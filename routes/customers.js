const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


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
        isGold: Boolean,
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// /api/customers/:id

router.get('/:id', async(req, res) => {

    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found!');// 404 
    res.send(customer);
});

// App POST

router.post('/', async (req, res) => {
    const { error } = validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request
         
    let customer = new Customer({ 
        name: req.body.name, 
        phone: req.body.phone, 
        isGold: req.body.isGold 
    });
    
    customer = await customer.save();
    res.send(customer);
});

// App PUT

router.put('/:id', async (req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
        }, 
        {
        new: true
    });
    // Update customer
    // Return the updated customer
    if (!customer) return res.status(404).send('The customer with the given ID was not found!');// 404 

    res.send(customer);
});

// App HTTP DELETE

router.delete('/:id', async (req, res) => {
    // Look up the customers
    // Not existing, return 404
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found!');// 404 
      
    // Return the same genre
    res.send(customer);
});

// function validateCustomers
function validateCustomers(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(7).required(),
        isGold: Joi.Boolean().required(),
    };
    
    return Joi.validate(customer, schema);
    
};

module.exports = router;