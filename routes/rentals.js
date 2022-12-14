// Create a new rental
// POST /api/rentals
// record customer, movie, date out, date in, decrease stock
// verify number in to rent, if non fail


// Get the list of rentals
// GET /api/rentals
const {Rental, validateRental} = require('../models/rentals'); 
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customers'); 
const mongoose = require('mongoose');
const Fawn = require('fawn'); // needs to be initialised
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Fawn.init(mongoose);
console.log('We are here in Rentals.js')

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateRental(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  
  
//   try {
//     await new Fawn.Task()
//     .save('rentals', rental)
//     .update('movies', { _id: movie._id }, {
//         $inc: { numberInStock: -1 }
//     })
//     .run();
//     res.send(rental);
//   }
//   catch(ex) {
//     res.status(500).send('Rentals update failed');
//   }
      
// });
rental = await rental.save();

  movie.numberInStock--;
  movie.save();
  
  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 