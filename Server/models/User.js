const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Firstname must be provided"],
  },

  lastname: {
    type: String,
    required: [true, "Lastname must be provided"],
  },

  department: {
    type: String,
    required: [true, "Department must be provided"],
  },

  username: {
    type: String,
    required: [true, "Username must be provided"],
  },

  email: {
    type: String,
    required: [true, "Email address must be provided"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password must be provided"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role must be provided"],
    default: "user",
  },
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
