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

    slideDuration: {
      type: Number,
      default: 2,
    },

    slideInterval: {
      type: Number,
      default: 5,
    },

    typeWriter: {
      type: Boolean,
      default: false,
    },

    background: {
      type: Boolean,
      default: true,
    },

    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },

    transitionType: {
      type: String,
      default: "fade",
    },

    textColor: {
      type: String,
      default: "#000000",
    },

    textAlign: {
      type: Object,
      default: () => {
        return {
          left: false,
          center: false,
          right: false,
        };
      },
    },

    fontWeight: {
      type: Object,
      default: () => {
        return {
          normal: false,
          bold: false,
          italic: false,
        };
      },
    },
    pSize: {
      type: String,
      default: "16px",
    },
    hSize: {
      type: String,
      default: "18px",
    },
    myFont: {
      type: String,
      default: "Times New Roman, serif",
    },
  },
  { timestamps: true }
);

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
