var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs");
mongoose.Promise = require('bluebird');

var userSchema = new mongoose.Schema({
    username: {type:String, unique:true, lowercase:true}, //makes username unique
    password: String
});
userSchema.pre('save', function(next) {
    var user = this; //this instance of user model
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err);}
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) {return next(err);}
            user.password = hash;
            next();
        });
    })
});

userSchema.methods.comparePasswords = function(inputPassword, callback) {
    bcrypt.compare(inputPassword, this.password, function(err, isMatch){
        if(err) {return callback(err);}
        callback(null, isMatch);
    });
}

var userModel = mongoose.model("user", userSchema);
module.exports = userModel;