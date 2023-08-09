const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const screenRoutes = require("./routes/screenRoutes");
const contentRoutes = require("./models/Content");

app.use(express.json());
app.use(cors());

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/Signage";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Mongo Connection is open");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
    console.log(err);
  });

app.use("/screens", screenRoutes);
app.use("/content", contentRoutes);

app.get("/newsfeed", async(req, res) => {
  try {

    const parser = new Parser();
    const feed = await parser.URL("https://feeds.24.com/articles/news24/TopStories/rss");
    res.json({news: feed.items});

  } catch (error) {
    res.status(500).json({error: "Error fetching the RSS feed"});
  }
  
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Listening for request on port ${port}`)
})