const jwt = require("jwt-simple");
const config = require("../config");

var User = require("../models/user");
function createTokenForUser(user){
    var timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat:timestamp }, config.secret) //sub -subject of token
}

exports.signup = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password){
        return res.status(422).send({error: "Missing username or password"});
    }

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
            //return JWT
            res.json({ token: createTokenForUser(user)});
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

