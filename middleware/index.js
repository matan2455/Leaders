var leaders = require('../models/leaders'),
    comments = require('../models/comments');


var middlewareObj = {};

middlewareObj.checkLeaderOwnership = function(req,res,next) {
	if(req.isAuthenticated()){
		leaders.findById(req.params.id, (err, leader)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			} else {
				if(leader.author.id.equals(req.user._id)){
					next();		
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}	
};

middlewareObj.checkCommentOwnership = function(req,res,next) {
	if(req.isAuthenticated()){
		comments.findById(req.params.comments_id, (err, comment)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			} else {
				if(comment.author.id.equals(req.user._id)){
					next();		
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}	
};

middlewareObj.isLoggedIn = function(req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}

module.exports = middlewareObj;