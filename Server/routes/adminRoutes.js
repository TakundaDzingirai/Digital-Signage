if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router({ mergeParams: true });
const Screen = require("../models/Screen");
const User = require("../models/User");
const { catchAsync } = require("../utilities/catchAsync");

// This route will be used to get all screens not yet approved by admin
router.get(
  "/screens",
  catchAsync(async (req, res) => {
    const screens = await Screen.find({ approved: false });
    res.json(screens);
  })
);

// This route will be used to approve a screen
router.put(
  "/screens/approve/:screenId",
  catchAsync(async (req, res) => {
    const screenId = req.params.screenId;
    const screen = await Screen.findById(screenId);

    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    screen.approved = true;
    await screen.save();

    res.json("Screen approved successfully");
  })
);

// Used to decline an approval
router.put(
  "/screens/decline/:screenId",
  catchAsync(async (req, res) => {
    const screenId = req.params.screenId;
    const screen = await Screen.findById(screenId);

    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    screen.approved = false;
    await screen.save();

    res.json("Screen approval declined successfully");
  })
);

// Used to get all users not yet approved by admin
router.get(
  "/users",
  catchAsync(async (req, res) => {
    const users = await User.find({ approved: false });
    res.json(users);
  })
);

// Used to approve a user
router.put(
  "/users/approve/:userId",
  catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.approved = true;
    await user.save();

    res.json("User approved successfully");
  })
);

// Used to decline a user
router.put(
  "/users/decline/:userId",
  catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.approved = false;
    await user.save();

    res.json("User approval declined successfully");
  })
);

module.exports = router;
