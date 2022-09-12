var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 3500;
require("./db/conn");
var FirstCollection = require("./models/schema");

require('dotenv').config();

var ejs = require("ejs");
var path = require("path");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

var jwt = require("jsonwebtoken");

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var fs = require('fs');
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));



app.use(express.static("public"));

const router = require('./routers');

app.use(express.static('public'))

app.use('/', router);

app.listen(port, () => {
    console.log("Okay");
})  // it's required when we are use socket-io

// app.listen(port , ()=>{
//     console.log("Okay");
// })  // it's required when we are use socket-io

const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: " http://192.168.1.96:3500"
}))
