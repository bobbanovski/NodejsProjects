var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("New Landing Page");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //temp array of campgrounds
    var campgrounds = [
        {name: "billabong shoal", image:"http://lorempixel.com/400/200/"},
        {name: "Granite Hill", image:"http://lorempixel.com/400/200/"},
        {name: "Dingo Beach", image:"http://lorempixel.com/400/200/"}
    ]
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(process.env.PORT || '80', process.env.IP, function() {
    console.log("YelpCamp started");
});