// API server using Express
// Genre API

const express = require('express');
//const connectDB = require('./connect');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const rentals = require('./routes/rentals');

//Connect to database
mongoose.connect('mongodb://nodejs:nodejs@starship.daconsulting.co.za/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));





app.use(express.json()); // req.body object populated from the request
app.use('/api/genres/', genres); // This tells express to route to genres module
app.use('/api/customers/', customers); // This tells express to route to customers module
app.use('/api/movies/',movies); // This tells express to route to movies module
app.use('/api/rentals/',rentals); // This tells express to route to rentals module

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

