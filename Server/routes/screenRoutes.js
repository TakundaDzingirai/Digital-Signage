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
        res.status(400).json({"Error": err});
    }
})

