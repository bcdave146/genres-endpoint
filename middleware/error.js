const winston = require('winston');

module.exports = function(err, req, res, next) {
    
    // Log the exception
    // winston log levels error, warn, info, verbose, debug, silly
    winston.error(err.message, err);

    // Display error to client
    if ((err.kind).indexOf('ObjectId') >= 0 && (err.message).indexOf('Genre') >= 0) 
        return res.status(404).send('rt-genres : The genre with the given ID was not found! ' + err.message);// 404 
            
    res.status(500).send('mw-error:Get Genres failed. ' + err.kind + ' : ' + err.message);
}