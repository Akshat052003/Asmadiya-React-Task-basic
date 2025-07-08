const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  age: Number,
  mobile: String,
  dob: Date,
  gender: String,
  department: String,
  role: String,
  joiningdate: Date,
  address: String,
  resume: String 
})

module.exports = mongoose.model("User" , userSchema)