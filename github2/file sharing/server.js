require("dotenv").config()
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const File = require("./models/File")

const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads" })

mongoose.connect('mongodb://localhost:27017/fileshare').then(()=>{
    console.log('connection established...');
}).catch((e)=>{
    console.log(e);
})

app.set("view engine", "ejs")

const cors= require('cors');
app.use(express.json());
app.use(cors({
    origin:" http://192.168.1.96:3000"
}))

app.get("/", (req, res) => {
  res.render("index")
})

// app.post("/upload", upload.single("file"), async (req, res) => {
    app.post("/upload", upload.array("file"), async (req, res) => {
//   const fileData = [{
//     path: req.files[0].path,
//     originalName: req.files[0].originalname,
//   },
//   {
//     path: req.files[1].path,
//     originalName: req.files[1].originalname,
//   }
// ]
//   if (req.body.password != null && req.body.password !== "") {
//     fileData.password = await bcrypt.hash(req.body.password, 10)
//   }

//   const file = await File.create(fileData)
const newfile = File({
    file:{
        path1:req.files[0].path,
        path2:req.files[1].path,
        originalName1:req.files[0].originalname,
        originalName2:req.files[1].originalname,
      }
})
  await newfile.save()


//   res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` })
res.render("index", { fileLink: `http://192.168.1.96:3000/file/${newfile._id}` })
})

app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id)

//   if (file.password != null) {
//     if (req.body.password == null) {
//       res.render("password")
//       return
//     }

    // if (!(await bcrypt.compare(req.body.password, file.password))) {
    //   res.render("password", { error: true })
    //   return
    // }
//   }

//   file.downloadCount++
//   await file.save()
  
//   console.log(file.downloadCount)
    console.log(file);
  res.download(file.file.path1, file.file.originalName1)
  res.download(file.file.path2, file.file.originalName2)
}

app.listen(3000)