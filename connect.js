const mongoose = require("mongoose");
const express = require('express');
const app = express();

const connectDB = (URL) => {
	return mongoose.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

console.log('We are in connect.js')
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose.connect('mongodb://nodejs:nodejs@starship.daconsulting.co.za/vidly')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));
        
        app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
            });
        } catch (error) {
        console.log(error);
        console.log('Failed to connect to the database, server is not running.');
        }
    };
start();


module.exports = connectDB;
