const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const screenSchema = Joi.object({
  screenName: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "The name of the screen must be provided",
    })
    .escapeHTML(),
  department: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "The department of the screen must be provided",
    })
    .valid("CSC", "Inf", "Accounting", "Politics")
    .messages({
      "any.required": "The department of the screen must be provided",
    })
    .escapeHTML(),
});

module.exports = screenSchema;
