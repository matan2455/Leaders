var passport = require('passport'),
    express = require('express'),
    router = express.Router({mergeParams: true}),
    leaders = require('../models/leaders.js'),
    comments = require('../models/comments.js');


var middleware = require('../middleware');


router.get('/leaders/:id/comments/new',middleware.isLoggedIn, (req,res)=>{
	leaders.findById(req.params.id, (err,leader)=>{
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {leader: leader});		
		}
	});
});

router.post("/leaders/:id/comments",middleware.isLoggedIn, (req,res)=>{
	
	leaders.findById(req.params.id, (err,leader) => {
		if(err){
			console.log(err);
			res.redirect("/leaders/:id/comments");
		}else{
			var comment = {
				text: req.body.comment.text,
				author: {
					username: req.user.username,
					id: req.user._id
				}
			}
			comments.create(comment, (err,comment)=>{
				
				if(err){
					console.log(err);
				} else {
					comment.save();
					leader.comments.push(comment);
					leader.save();
					res.redirect("/leaders/" + leader._id);
				}
			});
		}
	});
});

router.get("/leaders/:id/comments/:comments_id/edit",middleware.checkCommentOwnership, (req,res)=>{
	comments.findById(req.params.comments_id, (err,foundComment)=>{
		if(err){
			res.redirect("back");
		} else {
			leaders.findById(req.params.id,(err,foundLeader)=>{
				if (err) {
					res.redirect("back");
				} else {
					console.log(foundLeader);
					console.log(foundComment);
					res.render("comments/edit", {comment:foundComment, leader:foundLeader});
				}
			});
		}
	});
});

router.put('/leaders/:id/comments/:comments_id', (req,res)=>{
	var data = {
		text: req.body.text
	};
	//find and update the correct leader
	comments.findByIdAndUpdate(req.params.comments_id, data, function(err,updatedComment){
		if(err){
			res.redirect('back');
		}else{
			res.redirect('/leaders/' + req.params.id);
		}
	});
});

//COMMENTS DETROY ROUTE
router.delete("/leaders/:id/comments/:comments_id",middleware.checkCommentOwnership, (req,res)=>{
	comments.findByIdAndRemove(req.params.comments_id, function(err){
		if(err) {
			console.log(err);
			res.redirect("/leaders");
		} else {
			res.redirect("/leaders/" + req.params.id);	
		}
	});
});


module.exports = router;