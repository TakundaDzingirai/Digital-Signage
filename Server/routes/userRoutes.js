const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/User");

// This route will be used to register users
router.post("/register", async (req, res, next) => {
  const { firstname, lastname, department, email, username, password, role } =
    req.body;

  const user = new User({
    firstname,
    lastname,
    department,
    email,
    role,
    username,
  });

  const registeredUser = await User.register(user, password);
  req.logIn(registeredUser, (err) => {
    if (err) {
      console.log(err);
      // res.json("User logged in successfully");
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

module.exports = router;
