 //const request = require('request');
var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true});


//a schema for leaders.
var leaderSchema = new mongoose.Schema({
	username: String,
	password: String,
	description: String,
	image: String,
	location: String,
	hashtags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hashtag"
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	author: {
	    id: {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: "User"
	    }
	},
	followers: Number,
	bankAccount: {
		BankName: String,
		bankNumber: String,
		branch: String,
		accountNumber: String,
		accountName: String
	}
});

leaderSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("leader", leaderSchema);
