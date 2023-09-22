const express = require("express");
const Department = require("../models/Department");

class departmentController {
  static async createDepartment(req, res) {
    // Create a new department
    const department = new Department(req.body);

    // Save the new department
    await department.save();

    res.status(201).json("Department created successfully");
  }

  static async getAllDepartments(req, res) {
    // Fetch all departments from the db
    const departments = await Department.find({});

    res.status(200).json(departments);
  }

  static async getDeptById(req, res) {
    // Find a department by its unique ID
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  }

  static async editDepartment(req, res) {
    // Find and update a department by its ID
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Check if the department exists
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  }

  static async deleteDepartment(req, res) {
    // Find and delete a department by its ID
    const department = await Department.findByIdAndDelete(req.params.id);

    // Check if the department exists
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(204).send();
  }
}

module.exports = departmentController;
