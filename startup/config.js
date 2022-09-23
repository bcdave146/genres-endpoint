const config = require('config');

console.log('we are here in config.js');

module.exports = function () {
    
// Check environment variables here
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
    };
if (!config.get('mongodb_user' && 'mongodb_password')) {
    console.error('FATAL ERROR: Database credentials not defined.');
    process.exit(1);
};
};