const express = require("express");
const router = express.Router();
const multer = require('multer');
// Multer setup for handling image uploads
const storageMulter = multer.memoryStorage(); // Store image data in memory as a Buffer
const upload = multer({ storage: storageMulter });
const user = require("./user");

router.get("/", (req, res) => {
  res.send({
    message: "Welcome to the API",
  });
});

// user
router
  .get("/user/all", user.getAll)
  .post("/user", user.signUp)
  .post("/user/picture",  upload.single("file"),user.uploadPicture);
module.exports = router;
