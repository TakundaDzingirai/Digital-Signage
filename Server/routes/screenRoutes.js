const express = require("express");
const router = express.Router({mergeParams:true});
const Screen = require("../models/Screen");

// This route will be used to display all the active screens
router.get("/screens", async(req, res) => {
    try {
        // Retrieve all screens from the database
        const screens = await Screen.find({});
        res.json(screens);
    } catch (err) {
        res.status(400).json({"Error ": err});
    }
})

// This route will be used to create a new screen
router.post("/screens/new", async(req, res) => {
    try {
        const {screenName, department} = req.body;
        const screen = new Screen({screenName, department});
        await screen.save();
        res.json("Screen created successfully!");

    } catch (err) {
        res.status(400).json({"Error ": err})
    }
})

// This route will be used to view detailed information about a screen
router.get("/screens/:id", async(req, res) => {
    try {
        const screen = new Screen.findById(req.params.id);
        if (!screen) {
            return res.status(404).json({ "Error": "Screen not found" });
        }
        res.json(screen);

    } catch(err) {
        res.status(400).json({"Error " : err});
    }
})

module.exports = router;