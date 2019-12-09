var express = require('express'),
    router = express.Router(),
    leaders = require('../models/leaders.js');


var hashtags = ['Party', 'Night-Life', 'Food', 'Fashion', 'entrepreneurship', 'technology', 'Politics', 'nature', 'health'];

var middleware = require('../middleware')




router.get('/leaders/:id/edit',middleware.checkLeaderOwnership, (req,res)=>{
	leaders.findById(req.params.id, (err, leader)=>{
		if(err){
			console.log(err);
			res.redirect("/leaders");
		} else {
			res.render("leaders/edit", {leader: leader, hashtags: hashtags});		
		}
	});
});

router.put('/leaders/:id', (req,res)=>{
	var data = {
		username: req.body.name,
		image: req.body.image,
		followers: req.body.followers
	};
	//find and update the correct leader
	leaders.findByIdAndUpdate(req.params.id, data, function(err,updatedLeader){
		if(err){
			res.redirect('/leaders');
		}else{
			console.log(updatedLeader);
			res.redirect('/leaders/' + req.params.id);
		}
	});
});

router.delete("/leaders/:id",middleware.checkLeaderOwnership,(req,res)=>{
	leaders.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect('/leaders');
		}else{
			res.redirect('/leaders');
		}
	});
});

//==============================
//STARTING TO IMPLEMENT	ROUTS.==
//==============================
router.get("/", (req,res) => {
	res.render("landing");
	//res.render("landing", {leaders: leaders});
})

//NEW - show form to create new account
router.get("/publishers/new", (req, res)=>{
	res.render("newAccount")
});

router.get("/leaders/new",middleware.isLoggedIn, (req, res)=> {
	res.render("leaders/newLeader", {hashtags: hashtags});
});

//Show - more info about a Leader
router.get("/leaders/:id", (req,res) =>{
	leaders.findById(req.params.id).populate("comments").exec(function(err,foundLeader){
		if(err){
			console.log(err);
			res.redirect('/leaders/new')
		}else {
			res.render("leaders/show", {leader: foundLeader});	
		}					
	});
});

//create route - add new leader
router.post("/leaders",middleware.isLoggedIn, (req,res)=>{
	var username = req.body.username;
	var image = req.body.image;
	var description = req.body.description;
	var location = req.body.location;
	var hashtags = req.body.hashtag;
	var followers = req.body.followers;
	var myUser = {
		id: req.user._id,
		username: req.user.username
	};
	var newLeader = {username: username, image: image, description: description, hashtags: hashtags, followers: followers,
		author: myUser };
		console.log("that it!!!!" + newLeader.username);
	leaders.create(newLeader, (error, newLeader) =>	{ 
		console.log("new " + newLeader);
		if(error) {
			console.log(error);
		} else {
			res.render("leaders/show", {leader: newLeader});
		}
	});
});

//Index route - show all Leaders
router.get("/leaders", (req,res) => {
	leaders.find({}, (error,allLeaders)=>{
		if(error){
			console.log(error);
		}else{
			console.log(req.user);
			res.render("leaders/index",{leaders: allLeaders});		
		}
	});
});

module.exports = router;