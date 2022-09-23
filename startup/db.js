const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {

    mongoose.connect('mongodb://' + config.get('mongodb_user') + ':' + config.get('mongodb_password') + '@starship.daconsulting.co.za/vidly')
    .then(() => winston.info('Connected to MongoDB...'));
    // no need to catch the err as this is handled with exceptions handles
};