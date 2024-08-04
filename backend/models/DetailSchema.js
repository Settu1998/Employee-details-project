const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
 f_id: {
   type: Number,
   required: true,
 },
  
  f_name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
  },
  f_Mobile: {
    type: Number,
    required: true,
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_gender: {
    type: String,
    required: true,
  },
  f_Course: {
    type: String,
    required: true,
  },
  //f_image: {
   // type: String,
   // required: true,
 // },
  f_Createdate: {
    type:Date,
    default:Date.now,
  }
    });

module.exports = mongoose.model('Employee', detailSchema)