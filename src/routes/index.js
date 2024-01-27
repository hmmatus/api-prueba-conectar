const express = require("express");
const router = express.Router();

const user = require("./user");

router.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Pokemon Basic API",
  });
});

// user

module.exports = router;