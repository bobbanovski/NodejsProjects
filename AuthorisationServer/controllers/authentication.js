// var bodyparser = require("body-parser");
var User = require("../models/user");

exports.signup = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    User.findOne({ username: username}, function(err, existingUser) {
        if(err){ return next(err);}
        if (existingUser){
            return res.status(422).send({error: "Username already taken"});
        }
        var user = new User({
            username: username,
            password: password
        });
        user.save(function(err){
            if (err) {return next(err);}
            res.json({"Success": true});
        });
    });
    // User.create(new User({
    //     username: username,
    //     password: password
    // }));
}
    //check if user exists, return error if so   

    //     //if no user create username and password.
    
    
    //     //Respond to request
    // });

