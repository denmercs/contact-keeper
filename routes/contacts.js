const express = require("express");
const router = express.Router();

// @route       GET        api/contacts
// @desc        Get all users contacts
// @access      Private
router.get("/", (req, res) => {
  res.send("get all contacts");
});

// @route       POST        api/contacts
// @desc        add new contacts
// @access      Private
router.post("/", (req, res) => {
  res.send("add contacts");
});

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
