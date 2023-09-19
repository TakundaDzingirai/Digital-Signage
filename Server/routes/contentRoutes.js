const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer().single('image'); // Single file upload
const { validateContent } = require("../middleware/validation");
const catchAsync = require("../utilities/catchAsync");
const contentController = require("../controllers/contentController.js");
const fs = require('fs');
const util = require('util');
const { cloudinary } = require('../cloudinary/index');

const unlinkAsync = util.promisify(fs.unlink);

router.post('/:screenId', async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      const { slideTitle, post } = req.body;
      const screenId = req.params.screenId;

      const tempFilePath = `/tmp/${Date.now()}_temp_file`;
      fs.writeFileSync(tempFilePath, req.file.buffer);

      try {
        const result = await cloudinary.uploader.upload(tempFilePath, {
          folder: 'DigiSign',
        });

        await unlinkAsync(tempFilePath);

        const content = {
          slideTitle,
          post,
          imageUrl: result.secure_url, // Here you obtain the Cloudinary URL
        };

        // Now you can use the Cloudinary URL in your contentController
        await contentController.addContentToScreen(screenId, content);

        res.status(200).json({ message: 'Content added successfully', imageUrl: result.secure_url }); // Include the URL in the response
      } catch (uploadError) {
        console.error(uploadError);
        res.status(500).json({ error: 'Error uploading to Cloudinary' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// ...





// This route will be used to delete content from a screen
router.delete("/:contentId", catchAsync(contentController.deleteContent));

// This route will be used to edit individual screen content
router.put(
  "/edit/:contentId",
  validateContent,
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
