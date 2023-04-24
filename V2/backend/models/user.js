const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  role: {
    type: String,
    enum: ["attendee", "admin", "publisher"], // enum is an array of strings
    default: "attendee",
  },

  gender: {
    type: String,
    required: false,
    enum: ["Male", "Female", "Other"],  // enum is an array of strings
  },

  linkedin: {
    type: String,
    required: false,
  },

  instagram: {
    type: String,
    required: false,
  },

  // array of registered conferences ID  
  registered_conferences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conference",
    default: [],
  }],

  //Profile picture
  profile_picture: {
    type: String,
    required: false,
    default: ""
  },

});

// static signup function
userSchema.statics.signup = async function (username, email, password, role) {
  // validation
  if (!username || !email || !password || !role) {
    throw new Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol"
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("Email already exists");
  }

  //   hasing and creating new user
  const salt = await bcyrpt.genSalt(10);
  const hash = await bcyrpt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    role,
  });

  return user;
};

// static login function

userSchema.statics.login = async function (email, password, role) {
  // validation
  if (!email || !password || !role) {
    throw new Error("Please fill all the fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const match = await bcyrpt.compare(password, user.password);

  if (!match) {
    throw new Error("Email or password is incorrect");
  }

  if (user.role !== role) {
    throw new Error("You are not authorized to login");
  }

  return user;
};

// static update function
userSchema.statics.update = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Not authorized to update");
  }

  const salt = await bcyrpt.genSalt(10);
  const hash = await bcyrpt.hash(password, salt);
  user.password = hash; // update password
  await user.save();
  return user;
};

//static update function to update profile fields other than password and email
userSchema.statics.updateUserProfile = async function (req) {

  console.log("---------In update user profile function--------")
  const id = req.params.id;
  const user = await this.findOne({ _id: id });

  console.log(user)
  console.log(req.body)

  if (!user) {
    throw new Error("Not authorized to update");
  }

  const updatedUser = await this.findOneAndUpdate(
    { _id: id },
    req.body
  );
  return updatedUser;

};

// static function to get user by id
userSchema.statics.getUserById = async function (id) {
  const user = await this.findOne({ _id: id });
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// static function to get all users
userSchema.statics.getAllUsers = async function () {
  const users = await this.find({});
  return users;
};

//static function to upload an profile picture
userSchema.statics.uploadProfilePicture = async function (req) {
  console.log("---------In upload profile picture function--------", req.body.userId)
  const id = req.body.userId;
  const user = await this.findOne({ _id: id });

  if (!user) {
    throw new Error("Not authorized to update");
  }

  console.log("user", user);

  // const updatedUser = await this.findOneAndUpdate(
  //   { _id: id }, console.log("hello"),
  //   user.profile_picture = req.body.profile_picture,
  // );

  user.profile_picture = req.body.profile_picture;
  await user.save();
  // console.log(user.profile_picture);

  console.log("updated user", updatedUser);

  return updatedUser;
}

module.exports = mongoose.model("User", userSchema);