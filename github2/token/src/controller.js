var jwt = require("jsonwebtoken");
var FirstCollection = require("./models/schema");

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 3500;

require('dotenv').config();

var ejs = require("ejs");
var path = require("path");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var fs = require('fs');

app.use(express.static('public'))

const dirname = path.join(__dirname);



class class1 {

    static a = async (req, res) => {
        res.render('signup');
    }

    static b = async (req, res) => {

        var signuptoken = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);

        var addingMensRecords = new FirstCollection(
            {
                username: req.body.signusername,
                password: req.body.signpassword,
                signuptoken: signuptoken
            });

        await addingMensRecords.save();

        res.redirect('/login');
    }

    static c = async (req, res) => {
        res.render('login');
    }

    static d = async (req, res) => {

        try{

            var a = await FirstCollection.find({ username: req.body.loginusername });
            
            var logintoken = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
        
            res.cookie("logintoken",logintoken,
                {expires: new Date(Date.now() + 5000),
                httpOnly: true});

                if(req.body.loginpassword == a[0].password){
                    let session = req.session;
                    // console.log(session);
                    session.user = a[0].signuptoken
                    // console.log(session.user)
                    res.redirect('/first')
                }else{
                    res.redirect('/login')
                }

        }catch(e){

            res.redirect('/signup');
        }

    }

    static e = async (req, res) => {

        try{

            var userverify = await jwt.verify(req.cookies.logintoken, process.env.SECRET_KEY);

            if(userverify){
                res.render('first');
            }

        }catch(e){
            res.redirect('/login')
        }
        
        
    }

    static f = async (req, res) => {

        try{

            var userverify = await jwt.verify(req.cookies.logintoken, process.env.SECRET_KEY);

            if(userverify){
                res.render('second');
            }

        }catch(e){

            var session=req.session

            if(session.user){

                var logintoken = jwt.sign({ signuptoken: session.user }, process.env.SECRET_KEY);

                res.cookie("logintoken",logintoken,
                {expires: new Date(Date.now() + 5000),
                httpOnly: true});

                res.redirect('/second')

            }

        }
        
    }

}


module.exports = { class1 };