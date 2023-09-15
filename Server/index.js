if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/User.js");
const userRoutes = require("./routes/userRoutes.js");
const screenRoutes = require("./routes/screenRoutes.js");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const contentRoutes = require("./routes/contentRoutes");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const morgan = require("morgan");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Connect to the database
const dbURL = process.env.DB_URL;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection is open");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
    console.log(err);
  });

// JWT Secret

const secret =
  process.env.SECRET ||
  "eyJhbGciOiJIUzM4NCJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDcwOTg2MSwiaWF0IjoxNjk0NzA5ODYxfQ.XCMXxrh12xDS6Kum5d3E_n_VntWvjQv0e7JrM_I2eBkrSKTNnfdd45B5yImjCT6D";

// Passport JWT strategy setup
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/screens", screenRoutes);
app.use("/content", contentRoutes);
app.use("/", userRoutes);

app.use((req, res, next) => {
  console.log("req.session", req.session);
  return next();
});

app.all("*", (req, res, next) => {
  next(new ErrorResponse("Page Not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).json({ error: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for request on port ${port}`);
});
