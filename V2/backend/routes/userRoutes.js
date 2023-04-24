const express = require("express");

const router = express.Router();

// controllers
const {
  loginUser,
  signupUser,
  updateUser,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getUserById,
  uploadProfilePicture,
} = require("../controllers/userController");

// all users routes
router.get("/", getAllUsers);

//user by id route
router.get("/:id", getUserById);

// signup route
router.post("/signup", signupUser);

// login route
router.post("/login", loginUser);

// update route
router.patch("/update", updateUser);

//update Profile route
router.patch("/updateProfile/:id", updateUserProfile);

//upload profile picture route
router.patch("/uploadPicture", uploadProfilePicture)

// delete route
router.delete("/delete", deleteUser);

module.exports = router;
