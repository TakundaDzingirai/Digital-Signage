const express = require("express");
const ErrorResponse = require("../utilities/ErrorResponse");
const {
  screenSchema,
  contentSchema,
  userSchema,
} = require("../Schemas/Schema");
const Joi = require("joi");

const validateSchema = (schema) => (req, res, next) => {
  // Validate the request body against the provided schema
  const { error } = schema.validate(req.body);

  if (error) {
    // If validation fails, construct an ErrorResponse and throw it
    const errorMsg = error.details.map((el) => el.message).join(",");
    const validationError = new ErrorResponse(errorMsg, 400);
    // Pass the error to the error handling middleware
    next(validationError);
  } else {
    next();
  }
};

module.exports = {
  validateScreen: validateSchema(screenSchema),
  validateContent: validateSchema(contentSchema),
  validateUser: validateSchema(userSchema),
};
