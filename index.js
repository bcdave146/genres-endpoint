// API server using Express
// Genre API

const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');


// Connect to database
mongoose.connect('mongodb://nodejs:nodejs@starship.daconsulting.co.za/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json()); // req.body object populated from the request
app.use('/api/genres/', genres); // This tells express to route to genres module
app.use('/api/customers/', customers); // This tells express to route to customers module

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