if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateJwt } = require("../middleware/auth");
const catchAsync = require("../utilities/catchAsync");
const { validateScreen } = require("../middleware/validation");
const screenController = require("../controllers/screenController");

// This route will be used to display all the active screens
router.get("/", authenticateJwt, catchAsync(screenController.getAllScreens));

// This route will be used to create a new screen
router.post(
  "/",
  authenticateJwt,
  validateScreen,
  catchAsync(screenController.createNewScreen)
);

// This route will be used to view detailed information about a screen
router.get("/:id", catchAsync(screenController.getDetailedInfo));

// This route will be used to delete a screen
router.delete("/:id", catchAsync(screenController.deleteScreen));

// This route will be used to update/edit a screen
router.put(
  "/:id",
  validateScreen,
  catchAsync(screenController.updateSceenDetails)
);

// screen settings

// POST route to update screen settings
// post(`http://localhost:3000/screens/carousel/${id}
router.post(
  "/carousel/:id",
  catchAsync(screenController.updateScreenSettings)
);

module.exports = router;
