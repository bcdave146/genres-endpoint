// API server using Express
// Genre API
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // this is a function used for objectId validation added to Joi
const express = require('express');
// const connectDB = require('./connect');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

//Connect to database
async function dbConnect() {
await mongoose.connect('mongodb://nodejs:nodejs@starship.daconsulting.co.za/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
}
dbConnect();

app.use(express.json()); // req.body object populated from the request
app.use('/api/genres/', genres); // This tells express to route to genres module
app.use('/api/customers/', customers); // This tells express to route to customers module
app.use('/api/movies/',movies); // This tells express to route to movies module
app.use('/api/rentals/',rentals); // This tells express to route to rentals module
app.use('/api/users/',users); // This tells express to route to users module
app.use('/api/auth/',auth); // This tells express to route to auth module

app.use(error); // This handles all Errors, Error handling function 

app.use(function (req, res, next) {
    console.log('Logging...');
    next();
});



// APP GET all Genres 

app.get('/', (req, res) => {
    res.send('Hello World Genres API app?');
    
});


// When PORT is set

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// New connection code

