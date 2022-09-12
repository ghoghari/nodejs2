var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var firstSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true]
    },
    password: {
        type: String,
        required: true
    },
    signuptoken: {
        type: String
    },
    logintoken: {
        type: String
    }
});

var FirstCollection = mongoose.model("collectionname", firstSchema);
module.exports = FirstCollection;