 //const request = require('request');
var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true});


//a schema for leaders.
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
