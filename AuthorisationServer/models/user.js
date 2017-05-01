var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var userSchema = new mongoose.Schema({
    username: {type:String, unique:true, lowercase:true}, //makes username unique
    password: String
});

var userModel = mongoose.model("user", userSchema);
module.exports = userModel;