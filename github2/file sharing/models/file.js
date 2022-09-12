const mongoose = require("mongoose")

const File2 = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  password: String,
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
})

const File = new mongoose.Schema({
  file:{
    path1:String,
    path2:String,
    originalName1:String,
    originalName2:String,
  },
  password: String,
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  }
})

module.exports = mongoose.model("File", File)