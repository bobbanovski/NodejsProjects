var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/campsites");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Set up schema


//temp array of campgrounds
    // var campgrounds = [
    //     {name: "billabong shoal", image:"http://lorempixel.com/400/200/"},
    //     {name: "Granite Hill", image:"http://lorempixel.com/400/200/"},
    //     {name: "Dingo Beach", image:"http://lorempixel.com/400/200/"}
    // ]

app.get("/", function(req, res){
    // res.send("New Landing Page");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){    
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

app.post("/campgrounds", function(req, res) {
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
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT || '80', process.env.IP, function() {
    console.log("YelpCamp started");
});