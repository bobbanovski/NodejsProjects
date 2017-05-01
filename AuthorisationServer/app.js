var express = require("express"),
    mongoose = require("mongoose"),
    http = require("http"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"); //logging framework

var app = express();
mongoose.connect("mongodb://localhost/authorise"); //connect to database
//App setup
var router = require("./routes/router")

//Middleware
app.use(morgan("combined"));
app.use(bodyParser.json({ type: '*/*' }));

router(app); //put this after the middleware

//Server setup
var port = process.env.PORT || 80;
var server = http.createServer(app);
server.listen(port);
console.log("server listening on port: ", port);