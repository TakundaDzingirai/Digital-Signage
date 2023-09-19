const Content = require("../models/Content");
const Screen = require("../models/Screen");

class contentController {
  static async addContentToScreen(req, res) {
    // Extract data from the request body
    const { slideTitle, post, imageUrl } = req.body;
    // Get the screen ID from the URL parameters
    const screenId = req.params.screenId;

    // const createdBy = req.user.id;

    // Create an object with the content data
    console.log(req.user);
    const contentData = {
      slideTitle,
      post,
      imageUrl,
      screen: screenId,
      // createdBy,
    };
    // Create a new Content instance with the content data
    const content = new Content(contentData);
    // Save the new content to the database
    const savedContent = await content.save();
    // Update the Screen document to include the new content's ID
    await Screen.findByIdAndUpdate(screenId, {
      $push: { content: savedContent._id },
    });

    res.json(savedContent);
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
    // Update the content's properties with the provided data
    content.slideTitle = slideTitle;
    content.post = post;
    content.imageUrl = imageUrl;
    // Save the updated content
    const updatedContent = await content.save();
    res.json(updatedContent);
  }

  static async showAScreenScontent(req, res) {
    const { screenId } = req.params;
    // Find the screen by its ID and populate its content field
    const screen = await Screen.findById(screenId).populate("content");
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found***" });
    }
    res.json(screen.content);
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
