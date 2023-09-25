const mongoose = require("mongoose");
const Screen = require("../models/Screen");
const User = require("../models/User");
const { Schema } = mongoose;

const contentSchema = new Schema(
  {
    slideTitle: {
      type: String,
      required: [true, "slide title must be provided"],
    },

    post: {
      type: String,
      // required: [true, "post must be provided"],
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    qrCodeContent: {
      type: String,
    },

    qrCodeImage: {
      type: String,
    },

    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    video: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
