if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const Content = require("../models/Content");
const Screen = require("../models/Screen");
const router = express.Router({ mergeParams: true });
const { storage } = require("../cloudinary/index.js");
const multer = require("multer");
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 10,
  },
});

// This route will be used to add content to a screen
router.post("/:screenId", async (req, res) => {
  try {
    const { slideTitle, post, imageUrl } = req.body;
    const screenId = req.params.screenId;
    // const userId = req.user._id;

    const contentData = {
      slideTitle,
      post,
      imageUrl,
      screen: screenId,
      // user: userId,
    };

    const content = new Content(contentData);

    console.log("REQUEST BOYD: ", req.body);
    const savedContent = await content.save();

    await Screen.findByIdAndUpdate(screenId, {
      $push: { content: savedContent._id },
    });

    res.json(savedContent);
  } catch (err) {
    res.status(500).json({ "Error adding content to screen": err.message });
  }
});

// This route will be used to delete content from a screen
router.delete("/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(400).json({ Error: "Content not found" });
    }
    // Remove the content id from the screen
    const screenId = content.screen;
    await Screen.findByIdAndUpdate(screenId, {
      $pull: { content: contentId },
    });

    // res.json("Content deleted successfully");
    // res.redirect(`/screens/${screenId}`)
  } catch (err) {
    res.status(500).json({ "Error deleting content": err });
  }
});

// This route will be used to edit individual screen content
router.put("/edit/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;
    const { slideTitle, post, imageUrl } = req.body;

    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    content.slideTitle = slideTitle;
    content.post = post;
    content.imageUrl = imageUrl;

    const updatedContent = await content.save();

    res.json(updatedContent);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating content", details: err.message });
  }
});

// This route will be used to show all the content on a  specific screen
router.get("/:screenId", async (req, res) => {
  try {
    const { screenId } = req.params;
    const screen = await Screen.findById(screenId).populate("content");
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found***" });
    }
    console.log("Screen content:", screen.content);
    res.json(screen.content);
  } catch (err) {
    res.status(500).json({ error: "Errpr retriving screen content" });
  }
});

// This route will be used to view detailed information about a s specific content item
router.get("/more/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;
    const content = await Content.findById(contentId);

    if (!content) {
      res.status(404).json({ error: "Content not found" });
    } else {
      res.json(content);
    }
  } catch (err) {
    res.status(500).json({ err: "Error retriving content details" });
  }
});

// Consider route for reordering the contents on a screen(Drag and drop functionality)

module.exports = router;
