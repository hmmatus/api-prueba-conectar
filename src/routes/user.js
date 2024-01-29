const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const { userSchema } = require("../schema/user");
const { storage } = require("../firebase/config");
const {
  checkIfUserExists,
  createUser,
  getUsers,
  uploadImageToStorage,
} = require("../middlewares/user");
let user = (module.exports = {});


user.signUp = async (req, res) => {
  let body = req.body;
  const userExists = await checkIfUserExists(req.body);
  if (userExists.status) {
    return res.status(400).json({
      msg: userExists.error || "Email already exists",
    });
  }
  const {
    name,
    lastName,
    email,
    idNumber,
    idType,
    department,
    city,
    address,
    monthRevenue,
    image,
  } = body;
  const { error, value } = userSchema.validate({
    name,
    lastName,
    email,
    idNumber,
    idType,
    department,
    city,
    address,
    monthRevenue,
    image,
  });
  if (!error) {
    let result = createUser(body);
    result
      .then((user) => {
        res.json({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          idNumber: user.idNumber,
          idType: user.idType,
          department: user.department,
          city: user.city,
          address: user.address,
          monthRevenue: user.monthRevenue,
          image: user.image,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error,
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
};

user.getAll = async (req, res) => {
  let data = getUsers();
  data
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

user.uploadPicture = async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
  }
  try {
    const imageBuffer = req.file.buffer;
    const imageName = uuidv4();
    const file = storage.file(imageName);
    await file.save(imageBuffer, {contentType: "image/jpeg"});
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2025', // Set an expiration date for the URL
    });
    res.json({
      url,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
