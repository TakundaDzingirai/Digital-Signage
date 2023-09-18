if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/DigiSign";
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection is open");
  } catch (err) {
    console.error("Error connecting to Mongo");
    console.error(err);
  }
};

module.exports = connectToDatabase;
