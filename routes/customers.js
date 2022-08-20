const express = require('express');
const { Customer , validateCustomers } = require('../models/customers');
const router = express.Router();

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


module.exports = router;