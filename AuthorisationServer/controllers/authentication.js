const jwt = require("jwt-simple");
const config = require("../config");

var User = require("../models/user");
function createTokenForUser(user){
    var timestamp = new Date().getTime();
    var payload = {
        id: user._id,
        username: user.username,
        password: user.password
    }
    // return jwt.encode({ sub: user._id, iat:timestamp }, config.secret) //sub -subject of token
    return jwt.encode(payload, config.secret)
}

exports.signup = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body.id;

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
            password: password,
            id: id
        });
        var token = createTokenForUser(user);
        user.save(function(err){
            if (err) {return next(err);}
            //return JWT
            //res.json({ token: createTokenForUser(user)});
            res.cookie('token', token );
        });
        res.json({message: "ok", token: token});
    });
}

exports.signin = function(req,res,next) {
    //after authorisation, give jwt token
    res.send({ token: createTokenForUser(req.user)});
}

