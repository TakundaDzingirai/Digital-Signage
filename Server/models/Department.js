const mongoose = require('mongoose');
const {Schema} = mongoose;

const departmentSchema = new Schema({

  name: { 
    type: String, 
    required: true
 },
 
  screens: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screen' 
    }
],

}, { timestamps: true });

mongoose.model("Department", departmentSchema);

module.exports = Department;

