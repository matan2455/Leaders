var passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    User = require('../models/user.js');



router.get("/login", (req,res)=>{
	res.render('login');
});

router.post('/login',passport.authenticate("local", {
	successRedirect: "/leaders",
	failureRedirect: "/login"
	}), (req,res)=>{});  

router.get('/register', (req,res)=>{
	res.render('register', {currentUser: req.user});
});

router.post('/register', (req,res)=>{
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	console.log(password);
	User.register(new User({username: username}), password, (err,user)=>{
        if(err){
            console.log(err);
            res.render('error', {error: err});
        }else{
            passport.authenticate("local")(req,res,()=>{ 
			res.redirect('/leaders');
            });
        }
	});
});

//logout route
router.get('/logout', (req,res)=>{
	req.logout();
	res.redirect('/leaders');
});

module.exports = router;