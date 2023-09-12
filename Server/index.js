if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const screenRoutes = require("./routes/screenRoutes");
const contentRoutes = require("./routes/contentRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const ErrorResponse = require("./utilities/ErrorResponse");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

const secret = process.env.SECRET || "pangapasinakumiramushe";

app.use(
  session({
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/screens", screenRoutes);
app.use("/content", contentRoutes);
app.use("/", userRoutes);

app.get("/newsfeed", async (req, res) => {
  try {
    const parser = new Parser();
    const feed = await parser.URL(
      "https://feeds.24.com/articles/news24/TopStories/rss"
    );
    res.json({ news: feed.items });
  } catch (error) {
    res.status(500).json({ error: "Error fetching the RSS feed" });
  }
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
