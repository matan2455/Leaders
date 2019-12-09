 //const request = require('request');
var express = require('express');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true});


//a schema for comments.
var commentsSchema = new mongoose.Schema({
	text: String,
	author: {
	    id: {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: "User"
	    },
	    username: String
	}
});

module.exports = mongoose.model("Comment", commentsSchema);
