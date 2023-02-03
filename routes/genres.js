const express = require("express");
const mongoose = require("mongoose");

const validateObjectId = require("../middleware/validateObjectId");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Genre, validateGenre } = require("../models/genres");
const router = express.Router();

//const reportScript = 'rt-genres';

// Setup CORS parameters
const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
};

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  })
);

// /api/genres/1

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre)
      return res
        .status(404)
        .send("rt-genres : The genre with the given ID was not found!"); // 404 moved to error.js

    res.send(genre);
  })
);

// App POST - use auth middleware function to verify user

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  })
);

// App PUT

router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  // Update genre
  // Return the updated genre
  if (!genre)
    return res
      .status(404)
      .send("route-gener:The genre with the given ID was not found!"); // 404

  res.send(genre);
});

// App HTTP DELETE
// parameters path, middleware, req, res, next
router.delete("/:id", [auth, admin], async (req, res) => {
  // Look up the genres
  // Not existing, return 404
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found!"); // 404

  // Return the same genre
  res.send(genre);
});

module.exports = router;
