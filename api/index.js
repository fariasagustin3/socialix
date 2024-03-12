const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path")

// routes imports
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
dotenv.config();

// connection to mongoose
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to DB is successfully!")
  } catch(err) {
    console.log(err);
  }
} // end

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors({
  origin: '*'
}));

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// multer upload
const upload = multer({ storage: storage });
// provitional route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, async () => {
  console.log("Backend server is running")
  await connectionDB();
}) // end
