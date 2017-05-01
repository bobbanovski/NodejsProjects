var express = require("express"),
    router = express.Router(),
    passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    // res.send("New Landing Page");
    res.render("landing");
});

// ----------------------
// AUTH ROUTES
router.get("/register", function(req,res){
    res.render("register");
});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.error("something went wrong");
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            console.log(newUser);
            res.redirect("/campgrounds");
        });        
    });
});

//app.post(/login, middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
    
})

router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

module.exports = router;