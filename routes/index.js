var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT
router.get("/", function(req, res){
    res.render("landing");
});


//NEW - Show sign up form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});
// router.get("/register", function(req, res){
//     res.render("register");
// });

//CREATE - Sign up new user
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Hi " + user.username + ".  Welcome to Campground Finder!");
                res.redirect("/campgrounds");
            });
        }
    });
});

//NEW - Show log in form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});
// router.get("/login", function(req, res){
//     res.render("login");
// });

//CREATE - Handle log in logic
router.post("/login", passport.authenticate("local",
    {successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){

});

//Logout
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You have been logged out.");
   res.redirect("/campgrounds");
});


module.exports = router;