//const request = require('request');
var mongoose = require("mongoose"),
	passportLocalMongoose = require('passport-local-mongoose');
	
mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true});


//a schema for advertisers. 
var advertiserSchema = new mongoose.Schema({
	username: String,
	password: String,
	description: String,
	advertisment: String,
	budget: Number,
	hashtags: [{
		title: String,
	}],
});

advertiserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("advertisers", advertiserSchema);

