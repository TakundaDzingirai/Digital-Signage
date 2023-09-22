const Screen = require("../models/Screen");

class screenController {
  // Used to get all the screen
  static async getAllScreens(req, res) {
    let screens;
    // Check if the authenticated user's role is "admin"
    if (req.user.role === "admin") {
      // If the user is an admin, retrieve all screens in the database and sort them alphabetically by department
      screens = await Screen.find({}).sort({ department: 1 });
    } else {
      // If the user is not an admin, retrieve screens belonging to the user's department
      screens = await Screen.find({ department: req.user.department });
    }
    res.json(screens);
  }

  // Used to create a new screen
  static async createNewScreen(req, res) {
    // Extract data for creating a new screen from the request body
    const { screenName, department } = req.body;
    // Set createdBy to be the authenticated user
    const createdBy = req.user.id;
    // Create a new screen objcet with supplied data
    const screen = new Screen({ screenName, department, createdBy });
    // save screen to database
    await screen.save();
    res.json("Screen created successfully!");
  }

  // Used to get detailed screen information
  static async getDetailedInfo(req, res) {
    // Find screen by id from the db
    const screen = await Screen.findById(req.params.id);
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }
    res.json(screen);
  }

  // Used to delete a Screen
  static async deleteScreen(req, res) {
    // Find screen by id and delete
    const screen = await Screen.findByIdAndDelete(req.params.id);
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found" });
    }
    res.json("Screen deleted successfully");
  }

  // Used to update screen details
  static async updateSceenDetails(req, res) {
    // Find the screen by its ID and update it with the data in req.body
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!screen) {
      return res.status(400).json({ Error: "Screen not found" });
    }
    await screen.save();
    res.json(screen);
  }

  static async updateScreenSettings(req, res) {
    const screen = await Screen.findById(req.params.screenId);
    if (!screen) {
      return res.status(404).json({ Error: "Screen not found" });
    }

    const {
      slideDuration,
      slideInterval,
      typeWriter,
      background,
      textColor,
      backgroundColor,
      textAlign,
      fontWeight,
      pSize,
      hSize,
      myfont,
    } = req.body;

    screen.slideDuration = slideDuration;
    screen.slideInterval = slideInterval;
    screen.typeWriter = typeWriter;
    screen.background = background;
    screen.textColor = textColor;
    screen.backgroundColor = backgroundColor;
    screen.textAlign = textAlign;
    screen.fontWeight = fontWeight;
    screen.pSize = pSize;
    screen.hSize = hSize;
    screen.myfont = myfont;

    const updatedScreen = await Screen.save();
    return res.json(updatedScreen);
  }
}

module.exports = screenController;
