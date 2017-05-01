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
app.use("/", authRoutes);
app.use("/campgrounds", campsiteRoutes);

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