const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({

    username: {
        type: String, 
        required: [true, "username must be supplied"]
    },

    email: {
        type: String,
        required: [true, "Email address must be supplied"],
        unique: true
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },


})

module.exports = mongoose.model("User", userSchema);