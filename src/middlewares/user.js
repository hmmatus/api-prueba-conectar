const User = require("../db/models/user.model");
const bcrypt = require("bcrypt");
async function checkIfUserExists(body) {
  try {
    const checkUser = await User.findOne({ email: body.email });
    return {
      status: checkUser,
    };
  } catch (error) {
    return {
      status: true,
      error: "Server error",
    };
  }
}
async function createUser(body) {
  let user = new User({...body});
  return await user.save();
}

async function getUsers() {
  let users = User.find();
  return users
}

module.exports = {
  checkIfUserExists,
  createUser,
  getUsers
}