if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const jwt = require("jsonwebtoken");
const blacklist = new Set();

const authenticateJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if the token is blacklisted
  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    // Attach the user's data to the request for later use
    req.user = decoded;
    next();
  });
};

/*
This middlware will be used to check if a logged in user is an admin and should come after the user 
is suthenticated */
const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "admin") {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this route" });
  }
};

module.exports = {
  isAdmin,
  authenticateJwt,
  blacklist,
};
