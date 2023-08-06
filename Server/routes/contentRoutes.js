const express = require("express");
const Content = require("../models/Content");
const Screen = require("../models/Screen");
const router = express.Router();

// This route will be used to add content to a screen
router.post("/content/:screenId", async (req, res) => {
    try {
        const screenId = req.params.screenId;
        const userId = req.user._id; // Remember to implement sessions for this to work!!!! 
        const { title, type, data } = req.body;
        
        const content = new Content({ title, type, data, screen: screenId, user: userId });
        
        const savedContent = await content.save();
        
        await Screen.findByIdAndUpdate(screenId, {
            $push: { content: savedContent._id },
        });
        res.json(savedContent); 

    } catch (err) {
        res.status(500).json({ "Error adding content to screen": err });
    }
});
