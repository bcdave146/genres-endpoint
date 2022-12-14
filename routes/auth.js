const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const router = express.Router();
const passwordComplexity = require("joi-password-complexity"); 


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

    let user = await User.findOne( {email: req.body.email } );
    if (!user) return res.status(400).send('Invalid email or password.');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password');
    
    const token = user.generateAuthToken();
   
    res.send(token);

});

// function validate
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        //password: new passwordComplexity(complexityOptions, label).validate(user.password)
    };
    
    return Joi.validate(req, schema);
};


module.exports = router;
