const express = require("express");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  // req.flash("error", "You must be signed in !");
  return res.redirect("/login");
};
