const mongoose = require("mongoose");
const Content = require("../models/Content");
const { Schema } = mongoose;

const screenSchema = new Schema(
  {
    screenName: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
