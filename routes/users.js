const auth = require("../middleware/auth");

const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"])); // use _pick(lodash) to only select what you need from arrays
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token") // set this to allow the client to see the header
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    // console.log("In catch block users routes");
    return res.send(ex.response.statusText);
  }
});

module.exports = router;
