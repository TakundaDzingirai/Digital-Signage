const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

// This route will be used to register users
router.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, username, dateOfBirth, password } =
    req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    username,
    dateOfBirth,
  });
  const registeredUser = await User.register(user, password);
  req.logIn(registeredUser, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      res.redirect("/screens");
    }
  });
});

// This route will be used to login a user
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const redirectUrl = "/screens";
    res.redirect(redirectUrl);
  }
);

// This route will be used to logout a user
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/screens");
  });
});
