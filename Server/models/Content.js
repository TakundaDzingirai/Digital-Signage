const mongoose = require("mongoose");
const Screen = require("../models/Screen");
const User = require("../models/User");
const { Schema } = mongoose;

const contentSchema = new Schema(
  {
    slideTitle: {
      type: String,
      required: true,
    },

    post: {
      type: String,
      required: true,
    },

    images: [
      {
        URL: String,
        filename: String,
      },
    ],

    imageUrl: {
      type: String,
      required: true,
    },

    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
