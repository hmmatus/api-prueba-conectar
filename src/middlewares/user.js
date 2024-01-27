const User = require("../db/models/user.model");
const {storage} = require("../firebase/config");

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

async function uploadImageToStorage(file, remoteFilePath) {
    // Upload image to Firebase Storage
    await storage.upload(file?.buffer, {
      destination: remoteFilePath,
      metadata: {
        contentType: file?.mimetype, // Adjust the content type based on your file type
      },
    });

    // Get the download URL of the uploaded image
    const downloadURL = `https://storage.googleapis.com/${storage.name}/${remoteFilePath}`;
    return downloadURL;
}

module.exports = {
  checkIfUserExists,
  createUser,
  getUsers,
  uploadImageToStorage
}