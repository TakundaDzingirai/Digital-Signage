const express = require("express");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  // req.flash("error", "You must be signed in !");
  return res.redirect("/login");
};

const isAdmin = (req, res, next) => {
  if (req.user && req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  // req.flash("error", "You do not have permission to access that route");
  res.redirect("/screens");
};
