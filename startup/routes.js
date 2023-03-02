const express = require("express");
const cors = require("cors");

const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const error = require("../middleware/error");

// Setup CORS parameters
const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
};

module.exports = function (app) {
  app.use(cors(corsOptions), express.json()); // req.body object populated from the request to handle JSON type HTTP calls
  app.use("/api/genres/", cors(corsOptions), genres); // This tells express to route to genres module
  app.use("/api/customers/", cors(corsOptions), customers); // This tells express to route to customers module
  app.use("/api/movies/", cors(corsOptions), movies); // This tells express to route to movies module
  app.use("/api/rentals/", cors(corsOptions), rentals); // This tells express to route to rentals module
  app.use("/api/users/", cors(corsOptions), users); // This tells express to route to users module
  app.use("/api/auth/", cors(corsOptions), auth); // This tells express to route to auth module
  app.use("/api/returns/", returns); // This tells express to route to retrun modle

  app.use(error); // This handles all Errors, Error handling function in Express ONLY
};
