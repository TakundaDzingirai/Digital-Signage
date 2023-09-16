if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret =
  process.env.SECRET ||
  "eyJhbGciOiJIUzM4NCJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDcwOTg2MSwiaWF0IjoxNjk0NzA5ODYxfQ.XCMXxrh12xDS6Kum5d3E_n_VntWvjQv0e7JrM_I2eBkrSKTNnfdd45B5yImjCT6D";

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "You must be signed in !" });
};

const authenticateJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    // Attach the user's data to the request for later use
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  // req.flash("error", "You do not have permission to access that route");
  res.redirect("/screens");
};

const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports = {
  isLoggedIn,
  isAdmin,
  storeReturnTo,
  authenticateJwt,
};
