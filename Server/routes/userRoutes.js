const express = require("express");
const router = express.Router({ mergeParams: true });

const { blacklist, authenticateJwt } = require("../middleware/auth");
const catchAsync = require("../utilities/catchAsync");
const { validateUser } = require("../middleware/validation");
const userController = require("../controllers/userController");

// This route will be used to register users
router.post("/register", validateUser, catchAsync(userController.register));

// This route will be used for user login
router.post("/login", catchAsync(userController.login));

// Route to log out a user
router.post("/logout", authenticateJwt, userController.logout);

module.exports = router;
