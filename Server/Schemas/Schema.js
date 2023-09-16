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
    // .valid("CSC", "Inf", "Accounting", "Politics")
    .messages({
      "any.required": "The department of the screen must be provided",
    })
    .escapeHTML(),
});

const contentSchema = Joi.object({
  slideTitle: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "The slide title must be provided",
    })
    .escapeHTML(),
  post: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "The post content must be provided",
    })
    .escapeHTML(),
  imageUrl: Joi.string().trim().uri().messages({
    "any.required": "The image URL must be provided",
    "string.uri": "Invalid image URL format",
  }),
});

const userSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .required()
    .messages({ "any.required": "First name must be provided" })
    .escapeHTML(),
  lastname: Joi.string()
    .trim()
    .required()
    .messages({ "any.required": "Last name must be provided" })
    .escapeHTML(),
  department: Joi.string()
    .trim()
    .required()
    .messages({ "any.required": "Department must be provided" })
    .escapeHTML(),
  username: Joi.string()
    .trim()
    .required()
    .messages({ "any.required": "Username must be provided" })
    .escapeHTML(),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "any.required": "Email must be provided" })
    .escapeHTML(),
  role: Joi.string()
    .valid("admin", "user")
    .default("user")
    .messages({ "any.required": "Role must be provided" })
    .escapeHTML(),
  password: Joi.string()
    .required()
    .messages({ "any.required": "Password must be provided" }),
  // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

module.exports = {
  screenSchema,
  contentSchema,
  userSchema,
};
