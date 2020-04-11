const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the contactkeeper api" });
});

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT", PORT));
