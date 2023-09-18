if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

// Import User model and route handlers
const User = require("./models/User.js");
const userRoutes = require("./routes/userRoutes.js");
const screenRoutes = require("./routes/screenRoutes.js");
const contentRoutes = require("./routes/contentRoutes");
const ErrorResponse = require("./utilities/ErrorResponse.js");
const extractJwt = require("passport-jwt").ExtractJwt;

const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./database/db.js");

const app = express();

// Express middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Connect to MongoDB
connectToDatabase();

// JWT Secret key for token validation
const secret =
  process.env.SECRET ||
  "eyJhbGciOiJIUzM4NCJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDcwOTg2MSwiaWF0IjoxNjk0NzA5ODYxfQ.XCMXxrh12xDS6Kum5d3E_n_VntWvjQv0e7JrM_I2eBkrSKTNnfdd45B5yImjCT6D";

// Passport JWT strategy setup
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Enable CORS for specific origins with credentials support
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
    credentials: true,
  })
);

// Use the defined routes for screens, content, and users
app.use("/screens", screenRoutes);
app.use("/content", contentRoutes);
app.use("/", userRoutes);

// Catch-all route for handling 404 errors
app.all("*", (req, res, next) => {
  next(new ErrorResponse("Page Not found", 404));
});

// Error handling middleware to send appropriate error responses
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  console.log(err);
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).json({ error: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for request on port ${port}`);
});
