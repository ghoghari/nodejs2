var express = require("express");
const router = express.Router();
var { class1 } = require('./controller');

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

app.use(express.static('public'))

router.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})

router.get('/signup', class1.a);
router.post('/signup', class1.b);
router.get('/login', class1.c);
router.post('/login', class1.d);
router.get('/first', class1.e);
router.get('/second', class1.f);

module.exports = router;