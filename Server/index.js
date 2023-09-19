require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./database/db.js");
const path = require('path');
const busboy = require('busboy');
const fs = require('fs');
const sharp = require('sharp'); // Import sharp for image processing
const axios = require('axios'); // Import axios for streaming

// Define the destination folder for uploaded files using disk storage
const uploadDir = path.join(__dirname, 'uploads');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
  credentials: true,
}));

connectToDatabase();

app.use("/content", require("./routes/contentRoutes")); // Define your routes separately

app.post('/upload', (req, res) => {
  try {
    const busboyInstance = new busboy({ headers: req.headers });

    // Create a temporary file for the uploaded image
    const tempFilePath = path.join(uploadDir, 'tempUploadedFile'); // Change the temporary file name if needed
    const fileWriteStream = fs.createWriteStream(tempFilePath);

    busboyInstance.on('file', (fieldname, file, filename) => {
      // Pipe the file stream to the write stream
      file.pipe(fileWriteStream);
    });

    busboyInstance.on('finish', () => {
      // File upload is complete

      // Process and compress the uploaded image using sharp
      sharp(tempFilePath)
        .resize({ width: 800 }) // Adjust dimensions as needed
        .toBuffer(async (err, buffer) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error processing the image.');
          }

          // Now, you can upload the compressed image to Cloudinary
          try {
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, buffer, {
              headers: {
                'Content-Type': 'application/octet-stream',
              },
              params: {
                folder: 'DigiSign', // Set your desired folder
                // Additional Cloudinary upload options here
              },
            });

            const cloudinaryUrl = cloudinaryResponse.data.secure_url;

            // Perform any additional processing or database storage as needed

            // Send a response
            res.status(200).json({ message: 'Image uploaded and processed successfully', cloudinaryUrl });
          } catch (uploadError) {
            console.error(uploadError);
            res.status(500).send('Error uploading to Cloudinary.');
          }
        });

      // Clean up the temporary file
      fs.unlink(tempFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error deleting the temporary file:', unlinkError);
        }
      });
    });

    // Pipe the request stream to Busboy for parsing
    req.pipe(busboyInstance);

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during file upload.');
  }
});

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
