const mongoose = require("mongoose");
const Screen = require("../models/Screen");
const User = require("../models/User");
const {Schema} = mongoose;

const contentSchema = new Schema({
    
  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },

  data: {
    type: String,
    required: true,
  },

  screen: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Screen" 
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
