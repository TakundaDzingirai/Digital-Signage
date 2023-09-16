if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router({ mergeParams: true });
const Screen = require("../models/Screen");
const { authenticateJwt } = require("../middleware/auth");
const catchAsync = require("../utilities/catchAsync");

// This route will be used to display all the active screens
router.get(
  "/",
  authenticateJwt, // Middleware for JWT authentication
  catchAsync(async (req, res) => {
    let screens;

    // Check if the authenticated user's role is "admin"
    if (req.user.role === "admin") {
      // If the user is an admin, retrieve all screens in the database and sort them alphabetically by department
      screens = await Screen.find({}).sort({ department: 1 });
    } else {
      // If the user is not an admin, retrieve screens belonging to the user's department
      screens = await Screen.find({ department: req.user.department });
    }
    console.log("Logged in user", req.user);
    res.json(screens);
  })
);

// This route will be used to create a new screen
router.post(
  "/",
  authenticateJwt,
  catchAsync(async (req, res) => {
    // Extract data for creating a new screen from the request body
    const { screenName, department } = req.body;
    // Set createdBy to be the authenticated user
    const createdBy = req.user.id;
    // Create a new screen objcet with supplied data
    const screen = new Screen({ screenName, department, createdBy });
    // save screen to database
    await screen.save();
    res.json("Screen created successfully!");
  })
);

// This route will be used to view detailed information about a screen
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    // Find screen by id from the db
    const screen = await Screen.findById(req.params.id);
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found!!!" });
    }
    res.json(screen);
  })
);

// This route will be used to delete a screen
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    // Find screen by id and delete
    const screen = await Screen.findByIdAndDelete(req.params.id);
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found@@@" });
    }
    res.json("Screen deleted successfully");
  })
);

// This route will be used to update/edit a screen
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    // Find the screen by its ID and update it with the data in req.body
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found$$$" });
    }
    await screen.save();
    res.json(screen);
  })
);

module.exports = router;
