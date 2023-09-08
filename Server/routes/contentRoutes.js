const express = require("express");
const Content = require("../models/Content");
const Screen = require("../models/Screen");
const router = express.Router();
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
router.post("/:screenId", upload.array("image"), async (req, res) => {
  try {
    const screenId = req.params.screenId;
    const userId = req.user._id;
    const { slideTitle, post, imageUrl } = req.body;

    const contentData = {
      slideTitle,
      post,
      imageUrl,
      screen: screenId,
      user: userId,
    };

    // If there are images to upload
    if (req.files && req.files.length > 0) {
      contentData.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
    }

    const content = new Content(contentData);

    console.log(content);
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
router.delete("/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;
    const content = Content.findById(contentId);
    if (!content) {
      res.status(400).json({ Error: "Content not found" });
    }
    // Remove the content id from the screen
    const screenId = content.screen;
    await Screen.findByIdAndUpdate(screenId, {
      $pull: { content: contentId },
    });

    res.json("Content deleted successfully");
  } catch (err) {
    res.status(500).json({ "Error deleting content": err });
  }
});

// This route will be used to update content that displays on a screen
router.put("/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params.contentId;
    const { type, data, title } = req.body;
    const content = Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    content.title = title;
    content.type = type;
    content.data = data;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ "Error updating content": err });
  }
});

// This route will be used to show all the content on a  specific screen
router.get("/:screenId", async (req, res) => {
  try {
    const { screenId } = req.params;
    const screen = await Screen.findById(screenId).populate("content");
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }
    res.json(screen.content);
  } catch (err) {
    res.status(500).json({ error: "Errpr retriving screen content" });
  }
});

// This route will be used to view detailed information about a s specific content item
router.get("/:contentId", async (req, res) => {
  try {
    const content = Content.findById(req.params.contentId);
    if (!content) {
      res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ err: "Error retriving content details" });
  }
});

// Consider route for reordering the contents on a screen(Drag and drop functionality)

module.exports = router;
