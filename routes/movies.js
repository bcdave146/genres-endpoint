const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Movie, validateMovie } = require("../models/movies");
const { Genre } = require("../models/genres");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// /api/movies/:id

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found!"); // 404
  res.send(movie);
});

// App POST

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(movie);
});

// App PUT

router.put("/:id", auth, async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  // Update movie
  // Return the updated movie
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found!"); // 404

  res.send(movie);
});

// App HTTP DELETE

router.delete("/:id", [auth, admin], async (req, res) => {
  // Look up the movies
  // Not existing, return 404
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found!"); // 404

  // Return the same genre
  res.send(movie);
});

module.exports = router;
