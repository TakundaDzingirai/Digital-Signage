const express = require("express");
const router = express.Router({ mergeParams: true });
const Screen = require("../models/Screen");

// This route will be used to display all the active screens
router.get("/", async (req, res) => {
  try {
    // Retrieve all screens from the database
    const screens = await Screen.find({});
    res.json(screens);
  } catch (err) {
    res.status(400).json({ "Error ": err.message });
  }
});

// This route will be used to create a new screen
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { screenName, department } = req.body;
    // const user = req.user._id;
    console.log("REQUEST.BODY::", req.body);
    // Create a new Screen instance with the user's _id
    const screen = new Screen({ screenName, department });
    console.log("THE SCREEN: ", screen);
    await screen.save();
    res.json("Screen created successfully!");
  } catch (err) {
    console.error("Error creating screen:", err.message); // Log the error to the console
    res.status(400).json({ "Error ": err.message });
  }
});

// This route will be used to view detailed information about a screen
router.get("/:id", async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id);
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }
    res.json(screen);
  } catch (err) {
    res.status(400).json({ "Error ": err.message });
  }
});

// This route will be used to delete a screen
router.delete("/:id", async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found" });
    }
    res.json("Screen deleted successfully");
  } catch (err) {
    res.status(400).json({ "Error ": err.message });
  }
});

// This route will be used to update/edit a screen
router.put("/:id", async (req, res) => {
  try {
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found" });
    }
    await screen.save();
    res.json(screen);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

module.exports = router;
