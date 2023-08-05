const mongoose = require('mongoose');
const {Schema} = mongoose;

const screenSchema = new Schema({

  screenName: { 
    type: String, 
    required: true 
},

  department: { 
    type: String,
    required: true 
},

}, 
{ timestamps: true });

const Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen; 
