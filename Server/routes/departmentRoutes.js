const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const catchAsync = require("../utilities/catchAsync");
const departmentController = require("../controllers/departmentController");

// This route will be use to create a new department
router.post("/", catchAsync(departmentController.createDepartment));

// This route will be used to get all departments
router.get("/", catchAsync(departmentController.getAllDepartments));

// This route will be used to get a department by ID
router.get("/:id", catchAsync(departmentController.getDeptById));

// This route will be used to edit a department by ID
router.put("/:id", catchAsync(departmentController.editDepartment));

// This route will be used to delete a department by ID
router.delete("/:id", catchAsync(departmentController.deleteDepartment));

module.exports = router;
