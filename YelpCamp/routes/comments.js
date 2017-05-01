var express=require("express"),
    router = express.Router({mergeParams: true});

var Campground = require("../models/campgrounds");