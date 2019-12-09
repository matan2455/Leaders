 //const request = require('request');
var passportLocalMongoose = require('passport-local-mongoose'), 
	localSrategy= require('passport-local'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	mongoose = require("mongoose"),
	express = require('express'),
	seedDB = require('./seeds'),
	morgan = require('morgan'),
	app = express(),
	
	
	//mongoose Schema imports
	advertisers = require('./models/advertisers.js'),
	comments = require('./models/comments.js'),
	leaders = require('./models/leaders.js'),
	User = require('./models/user.js'),
	hashtags = require('./models/hashtags.js');
	
	var commentRouts = require('./routs/comments.js');
	var leadersRouts = require('./routs/leaders.js');
	var indexRouts = require('./routs/index.js');

	
// express/mongoose definition
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/Leaders", {useNewUrlParser: true,  useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//seedDB();

//define express-session
app.use(require("express-session")({
	secret: 'dona is the best dog ever',
	resave: false,
	saveUninitialized: false
}));


//Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localSrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// insert current user to every views page 
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//requiring routs
app.use(leadersRouts);
app.use(commentRouts);
app.use(indexRouts);

app.listen(8080, (req,res) =>{
	console.log("Leaders has started");
});
