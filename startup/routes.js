const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(express.json());                            // req.body object populated from the request to handle JSON type HTTP calls
    app.use('/api/genres/', genres);                    // This tells express to route to genres module
    app.use('/api/customers/', customers);              // This tells express to route to customers module
    app.use('/api/movies/',movies);                     // This tells express to route to movies module
    app.use('/api/rentals/',rentals);                   // This tells express to route to rentals module
    app.use('/api/users/',users);                       // This tells express to route to users module
    app.use('/api/auth/',auth);                         // This tells express to route to auth module

    app.use(error);                                     // This handles all Errors, Error handling function in Express ONLY
};