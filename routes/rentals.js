// Create a new rental
// POST /api/rentals
// record customer, movie, date out, date in, decrease stock
// verify number in to rent, if non fail

// Get the list of rentals
// GET /api/rentals
const express = require("express");
const { Rental, validateRental } = require("../models/rentals");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customers");
const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find({ dateReturned: { $exists: false } }).sort(
    "-dateOut"
  );
  // TODO add calculate the rentalFee to display on the rentals page as Amount Due - HERE

  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const movie = await Movie.findById(req.body.movieId).session(session);
    if (!movie) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Invalid movie.");
    }

    if (movie.numberInStock === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Movie not in stock.");
    }

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    rental = await rental.save({ session });

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send(rental);
  } catch (ex) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    res.status(500).send("Something failed.");
    throw ex;
  }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
