const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./database/db.js");
const path = require('path'); // Node.js built-in module for file paths
const busboy = require('busboy'); // Add busboy for streaming
const fs = require('fs'); // Import the 'fs' module

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
    const fileWriteStream = fs.createWriteStream(path.join(uploadDir, 'uploadedFile')); // Set your desired file name

    busboyInstance.on('file', (fieldname, file, filename) => {
      // Pipe the file stream to the write stream
      file.pipe(fileWriteStream);
    });

    busboyInstance.on('finish', () => {
      // File upload is complete
      // You can now process or upload the file as needed
      // For example, you can use the 'fs' module to read the file and perform actions on it
      fs.readFile(path.join(uploadDir, 'uploadedFile'), (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while processing the file.');
        }

        // Process the file data here

        // Now, you can upload the file to Cloudinary
        cloudinary.uploader.upload(data, {
          folder: 'DigiSign', // Set your desired folder
          // Additional Cloudinary upload options here
        }, (uploadError, result) => {
          if (uploadError) {
            console.error(uploadError);
            return res.status(500).send('Error uploading to Cloudinary.');
          }

          // You can access the Cloudinary URL in `result.secure_url`
          const cloudinaryUrl = result.secure_url;

          // Perform any additional processing or database storage as needed
          res.status(200).json({ message: 'File uploaded successfully', cloudinaryUrl });
        });
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
