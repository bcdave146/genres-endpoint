const mongoose = require("mongoose");

const connectDB = (URL) => {
	return mongoose.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

const start = async () => {
    try {
        await connectDB("mongodb://nodejs:nodejs@starship.daconsulting.co.za/vidly");
        app.listen(port, () => {
        console.log(`Server is running on port ${PORT}.`);
            });
        } catch (error) {
        console.log(error);
        console.log('Failed to connect to the database, server is not running.');
        }
    };
start();


module.exports = connectDB;
