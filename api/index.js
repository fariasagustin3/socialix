const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, async () => {
  console.log("Backend server is running")
  await connectionDB();
}) // end
