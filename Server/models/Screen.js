const mongoose = require("mongoose");
const Content = require("../models/Content");
const { Schema } = mongoose;

const screenSchema = new Schema(
  {
    screenName: {
      type: String,
      required: [true, "Screen name must be provided"],
    },

    department: {
      type: String,
      required: [true, "Department must be provided"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],

    duration: {
      type: Number,
    },

    interval: {
      type: Number,
    },

    fadeEnter: {
      type: Boolean,
      default: false,
    },

    fadeEnterActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
