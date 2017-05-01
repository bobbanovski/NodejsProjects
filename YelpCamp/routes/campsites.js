var express = require("express");
var router = express.Router();
var Campsite = require("../models/campsite");

router.get("/", function(req, res){    
    //res.render("campgrounds", {campgrounds:campgrounds});
    //get all campgrounds from db
    Campsite.find({}, function(err, allCampsites){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampsites}); //send to ejs file
        }
    })
});

router.post("/", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var costPerNight = req.body.costPerNight;
    var newCampground = {name: name, image: image, costPerNight: costPerNight}
    //create and save to database
    Campsite.create(newCampground, function(err, done){
        if(err){
            console.log("error found");
        } else {
            res.redirect("/campgrounds");
        }
    });
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;