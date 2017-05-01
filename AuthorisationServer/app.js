var express = require("express"),
    mongoose = require("mongoose"),
    http = require("http"),
    bodyparser = require("body-parser"),
    morgan = require("morgan"); //logging framework

var app = express();
//App setup

//Middleware
app.use(morgan("combined"));
app.use(bodyparser.json({type: '*/*'}));


//Server setup
var port = process.env.PORT || 80;
var server = http.createServer(app);
server.listen(port);
console.log("server listening on: ", port);