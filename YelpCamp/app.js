var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose    = require("mongoose");
mongoose.Promise = require('bluebird'); //required for Passport-mongoose

//include routes
var campsiteRoutes  = require("./routes/campsites"),
    authRoutes      = require("./routes/auth")

//include models
var Campsite = require("./models/campsite");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/campsites");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Configure PASSPORT
app.use(require("express-session")({
    secret: "dfu8udso323jndj2oih23",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//use passport-local-mongoose in user.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
//use route files
app.use(authRoutes);
app.use(campsiteRoutes);

// app.get("/", function(req, res){
//     // res.send("New Landing Page");
//     res.render("landing");
// });

// // ----------------------
// // AUTH ROUTES
// app.get("/register", function(req,res){
//     res.render("register");
// });

// app.get("/login", function(req,res){
//     res.render("login");
// });

//-----------------------

// app.get("/campgrounds", function(req, res){    
//     //res.render("campgrounds", {campgrounds:campgrounds});
//     //get all campgrounds from db
//     Campsite.find({}, function(err, allCampsites){
//         if (err){
//             console.log(err);
//         } else {
//             res.render("campgrounds", {campgrounds:allCampsites}); //send to ejs file
//         }
//     })
// });

// app.post("/campgrounds", function(req, res) {
//     var name = req.body.name;
//     var image = req.body.image;
//     var costPerNight = req.body.costPerNight;
//     var newCampground = {name: name, image: image, costPerNight: costPerNight}
//     //create and save to database
//     Campsite.create(newCampground, function(err, done){
//         if(err){
//             console.log("error found");
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });
//     res.redirect("/campgrounds");
// });

// app.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err,user){
//         if(err){
//             console.error("something went wrong");
//             return res.render("register");
//         } 
//         passport.authenticate("local")(req, res, function(){
//             console.log(newUser);
//             res.redirect("/campgrounds");
//         });        
//     });
// });

// //app.post(/login, middleware, callback)
// app.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }), function(req, res) {
    
// })

// app.get("/logout", function(req, res){
//     req.logOut();
//     res.redirect("/campgrounds");
// });

//create islogged in middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

app.listen(process.env.PORT || '80', process.env.IP, function() {
    console.log("YelpCamp started");
});