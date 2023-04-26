// config to dotenv
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const { google } = require("googleapis");
const Multer = require("multer");

const userRoutes = require("./routes/userRoutes");
const orgRoutes = require("./routes/orgRoutes");
const conferenceRoutes = require("./routes/conferenceRoutes");

const corsOptions = {
  origin: "*",
  successStatus: 200,
};

// express app
const app = express();

const multer = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}/papers`);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + "_" + file.originalname
      );
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// authenticate with google
const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./key-file.json",
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

// upload to google drive
const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["1ADFpHcBEnWz632M913g__xy8nuDO4fkz"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/auth/user", userRoutes);
app.use("/auth/org", orgRoutes);
app.use("/org", conferenceRoutes);
app.post("/upload", multer.single("file"), async (req, res) => {
  console.log("body", req.file);
  const auth = authenticateGoogle();
  const response = await uploadToGoogleDrive(req.file, auth);
  deleteFile(req.file.path);
  res.status(200).json({ response });
});

app.get("/files", async (req, res) => {
  const auth = authenticateGoogle();
  const response = await google.drive({ version: "v3", auth }).files.list();
  res.status(200).json({ response });
});

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    if (!module.parent) {
      app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT);
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
