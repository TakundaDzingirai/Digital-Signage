const express = require("express");
const Content = require("../models/Content");
const Screen = require("../models/Screen");
const { cloudinary } = require("../cloudinary/index");
const { Console } = require("console");
const { storage } = require("../cloudinary/index");

class contentController {
  static async addContentToScreen(screenId, contentData) {
    //Create a new Content instance with the content dat
    const content = new Content(contentData);
    // Save the new content to the database
    const savedContent = await content.save();
    // Update the Screen document to include the new content's ID
    await Screen.findByIdAndUpdate(screenId, {
      $push: { content: savedContent._id },
    });

    // res.json(savedContent);
  }

  static async deleteContent(req, res) {
    const { contentId } = req.params;
    // Find the content by its ID
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(400).json({ Error: "Content not found" });
    }
    // Get the screen ID associated with the content
    const screenId = content.screen;
    // Remove the content ID from the associated screen
    await Screen.findByIdAndUpdate(screenId, {
      $pull: { content: contentId },
    });
    res.json("Content deleted successfully");
  }

  static async editContent(req, res) {
    const { contentId } = req.params;
    // Extract content data from the re.body
    const { slideTitle, post, imageUrl } = req.body;
    // Find the content by its ID
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    // Update content's properties with the provided data
    content.slideTitle = slideTitle;
    content.post = post;
    content.imageUrl = imageUrl;
    // Save the updated content
    const updatedContent = await content.save();
    res.json(updatedContent);
  }

  static async showAScreenScontent(req, res) {
    const { screenId } = req.params;
    // Find screen by its ID and populate its content field
    const screen = await Screen.findById(screenId).populate("content");
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }

    const currentDate = new Date();

    // Filter content to include only valid content
    const validContent = screen.content.filter((content) => {
      return (
        !content.endDate ||
        (currentDate >= content.startDate && currentDate <= content.endDate)
      );
    });

    console.log(validContent);

    res.json(validContent);
  }

  static async getScreenContent(req, res) {
    const { screenId } = req.query;

    // Find screen by its ID and populate its content field
    const screen = await Screen.findById(screenId).populate("content");
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }

    // Get the current date
    const currentDate = new Date();

    // Filter content to include only valid content
    const validContent = screen.content.filter((content) => {
      return (
        !content.endDate ||
        (currentDate >= content.startDate && currentDate <= content.endDate)
      );
    });

    const settings = {
      slideDuration: screen.slideDuration,
      slideInterval: screen.slideInterval,
      typeWriter: screen.typeWriter,
      background: screen.background,
      textColor: screen.textColor,
      backgroundColor: screen.backgroundColor,
      textAlign: screen.textAlign,
      fontWeight: screen.fontWeight,
      pSize: screen.pSize,
      hSize: screen.hSize,
      myFont: screen.myFont,
      transitionType: screen.transitionType,
    };

    res.json({ content: validContent, settings });
  }

  static async showDetailedContent(req, res) {
    const { contentId } = req.params;
    // Find the content by its ID
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  }
}

module.exports = contentController;
