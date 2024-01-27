const { userSchema } = require("../schema/user");
const {
  checkIfUserExists,
  createUser,
  getUsers,
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
