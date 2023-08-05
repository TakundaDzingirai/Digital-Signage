const mongoose = require("mongoose");
const {Schema} = mongoose;

const screenSchema = new Schema({
    screenName: {
        type: String,
        required: true
    },
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "Content"}]
})

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;