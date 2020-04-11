const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route       GET        api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// @route       POST        api/auth
// @desc        Auth user and get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please type a password").exists(),
  ],
  async (req, res) => {
    // express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // check email
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
    res.send("Get login user");
  }
);

module.exports = router;
