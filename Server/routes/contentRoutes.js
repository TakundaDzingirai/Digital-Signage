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

// This route will be used to delete content from a screen
router.delete("/content/:contentId", async(req, res) => {
    try {
        const {contentId} = req.params;
        const content = Content.findById(contentId);
        if (!content) {
            res.status(400).json({"Error": "Content not found"});
        }
        // Remove the content id from the screen
        const screenId = content.screen;
        await Screen.findByIdAndUpdate(screenId, {
            $pull: { content: contentId },
        })

        res.json("Content deleted successfully");

    } catch (err) {
        res.status(500).json({ "Error deleting content": err });
    }
})

router.put("/content/:contentId", async(req, res) => {
    try {
        const{contentId} = req.params.contentId;
        const {type, data, title} = req.body;
        const content = Content.findById(contentId);
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        content.title = title;
        content.type = type;
        content.data = data;

        const updatedContent = await content.save()
        res.json(updatedContent);

    } catch(err) { 
        res.status(500).json({ "Error updating content" : err });
    }
   
})