if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
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

const catchAsync = require("../utilities/catchAsync");
const { validateContent } = require("../middleware/validation");
const contentController = require("../controllers/contentController.js");

// This route will be used to add content to a screen
router.post(
  "/:screenId",
  validateContent,
  catchAsync(contentController.addContentToScreen)
);

// This route will be used to delete content from a screen
router.delete("/:contentId", catchAsync(contentController.deleteContent));

// This route will be used to edit individual screen content
router.put(
  "/edit/:contentId",
  // validateContent,
  catchAsync(contentController.editContent)
);

// This route will be used to show all the content on a  specific screen
router.get("/:screenId", catchAsync(contentController.showAScreenScontent));

// This route will be used to view detailed information about a s specific content item
router.get(
  "/more/:contentId",
  catchAsync(contentController.showDetailedContent)
);

// Consider route for reordering the contents on a screen(Drag and drop functionality)

module.exports = router;
