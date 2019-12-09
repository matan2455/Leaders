 //const request = require('request');
var express = require('express');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true});


//a schema for comments.
var hashtagsSchema = new mongoose.Schema({
	title: String
});

module.exports = mongoose.model("Hashtag", hashtagsSchema);