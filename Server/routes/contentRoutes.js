const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer().single("media"); // Single file upload, use a field named "media"
const { validateContent } = require("../middleware/validation");
const catchAsync = require("../utilities/catchAsync");
const contentController = require("../controllers/contentController.js");
const fs = require("fs");
const util = require("util");
const { cloudinary } = require("../cloudinary/index");
const Content = require("../models/Content");

const unlinkAsync = util.promisify(fs.unlink);

router.post("/:screenId", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }

      const { slideTitle, post, startDate, endDate } = req.body;
      const screenId = req.params.screenId;
     
      const tempFilePath = `/tmp/${Date.now()}_temp_file`;

      try {
        let contentData = {
          slideTitle,
          post,
          startDate,
          endDate,
        };

        if (req.file) {
          const isImage = req.file.mimetype.startsWith("image/");
          const isVideo = req.file.mimetype.startsWith("video/");
          console.log("Video:", isVideo)

          fs.writeFileSync(tempFilePath, req.file.buffer);

          if (isImage) {
            const result = await cloudinary.uploader.upload(tempFilePath, {
              folder: "DigiSign",
            });

            await unlinkAsync(tempFilePath);

            contentData = {
              ...contentData,
              image: {
                public_id: result.public_id,
                url: result.secure_url,
              },
            };
          } else if (isVideo) {
            console.log("It's a video");
            const result = await cloudinary.uploader.upload(tempFilePath, {
              folder: "Videos",
              resource_type: "video",
              chunk_size: 1000,
              eager: [{ width: 300, height: 300, crop: "pad" }], // You can add any eager transformations you need
            });

            await unlinkAsync(tempFilePath);

            contentData = {
              ...contentData,
              video: {
                public_id: result.public_id,
                url: result.secure_url,
              },
            };
          }
        }
        console.log(contentData)
        // Now you can use the Cloudinary URL in your contentController
        await contentController.addContentToScreen(screenId, contentData);

        res.status(200).json({ message: "Content added successfully" });
      } catch (uploadError) {
        console.error(uploadError);
        res.status(500).json({ error: "Error uploading to Cloudinary" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ... rest of your routes remain unchanged


// This route will be used to delete content from a screen
router.delete("/:contentId", catchAsync(contentController.deleteContent));

// This route will be used to edit individual screen content
router.put(
  "/edit/:contentId",
  // validateContent,
  catchAsync(contentController.editContent)
);

// route used to get content using queryString
router.get("/allContent", catchAsync(contentController.getScreenContent));

// This route will be used to show all the content on a  specific screen
router.get("/:screenId", catchAsync(contentController.showAScreenScontent));

// This route will be used to view detailed information about a s specific content item
router.get(
  "/more/:contentId",
  catchAsync(contentController.showDetailedContent)
);

module.exports = router;
