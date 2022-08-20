const Joi = require('joi');
const mongoose = require('mongoose');

// Create schema
// const genres = [
//     { id:1, name: 'Action' },
//     { id:2, name: 'Sport' },
//     { id:3, name: 'Horror' },
//     { id:4, name: 'Family' },
// ];

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    }
}));


// function validateGenre
function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(genre, schema);
    
};

module.exports.Genre = Genre;
module.exports.validateGenres = validateGenres;
