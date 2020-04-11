const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route       GET        api/contacts
// @desc        Get all users contacts
// @access      Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      data: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST        api/contacts
// @desc        add new contacts
// @access      Private
router.post(
  "/",
  [authMiddleware, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT        api/contacts
// @desc        edit users contacts
// @access      Private
router.put("/:id", (req, res) => {
  res.send("edit all contacts");
});

// @route       DELETE        api/contacts
// @desc        delete a user contact
// @access      Private
router.delete("/:id", (req, res) => {
  res.send("delete a contacts");
});

module.exports = router;
