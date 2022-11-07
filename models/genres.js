const Joi = require('joi');
const mongoose = require('mongoose');

// Create schema
// const genres = [
//     { id:1, name: 'Action' },
//     { id:2, name: 'Sport' },
//     { id:3, name: 'Horror' },
//     { id:4, name: 'Family' },
// ];

const genreSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

// function validateGenre
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
    
    return Joi.validate(genre, schema);
    
};

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
