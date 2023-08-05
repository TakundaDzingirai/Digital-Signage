const mongoose = require('mongoose');
const {Schema} = mongoose;

const contentSchema = new Schema({
    
  title: { 
    type: String, 
    required: true 
},
  type: { 
    type: String, 
    enum: ['text', 'image', 'video'], 
    required: true 
},
  data: {
    type: String,
    required: true
  },

}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

mopdule.exports = Content;
