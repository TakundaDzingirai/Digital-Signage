require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./database/db.js");
const path = require("path");
const busboy = require("busboy");
const fs = require("fs");
const sharp = require("sharp");
const axios = require("axios");
const userRoutes = require("./routes/userRoutes.js");
const screenRoutes = require("./routes/screenRoutes.js");
const contentRoutes = require("./routes/contentRoutes.js");
const departmentRoutes = require("./routes/departmentRoutes.js");
const uploadDir = path.join(__dirname, "uploads");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

connectToDatabase();

app.post("/upload", (req, res) => {
  try {
    const busboyInstance = new busboy({ headers: req.headers });

    const tempFilePath = path.join(uploadDir, "tempUploadedFile");
    const fileWriteStream = fs.createWriteStream(tempFilePath);

    busboyInstance.on("file", (fieldname, file, filename) => {
      file.pipe(fileWriteStream);
    });

    busboyInstance.on("finish", () => {
      sharp(tempFilePath)
        .resize({ width: 800 })
        .toBuffer(async (err, buffer) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error processing the image.");
          }

          try {
            const cloudinaryResponse = await axios.post(
              `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
              buffer,
              {
                headers: {
                  "Content-Type": "application/octet-stream",
                },
                params: {
                  folder: "DigiSign",
                },
              }
            );

            const cloudinaryUrl = cloudinaryResponse.data.secure_url;

            res.status(200).json({
              message: "Image uploaded and processed successfully",
              cloudinaryUrl,
            });
          } catch (uploadError) {
            console.error(uploadError);
            res.status(500).send("Error uploading to Cloudinary.");
          }
        });

      fs.unlink(tempFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting the temporary file:", unlinkError);
        }
      });
    });

    req.pipe(busboyInstance);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during file upload.");
  }
});

app.use("/", userRoutes);
app.use("/screens", screenRoutes);
app.use("/content", contentRoutes);
app.use("/departments", departmentRoutes);

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
