const passport = require("passport"),
    JwtStrategy = require("passport-jwt").Strategy,
    LocalStrategy = require("passport-local"),
    ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config");
const User = require("../models/user");

//============== LOCAL STRATEGY ==========================
const localOptions = {usernameField: 'username'}
const localLogin = new LocalStrategy(localOptions, function(username, password, done){
    //verify username and password
    User.findOne({username: username }, function (err, user){
        if (err) {return done(err);}
        if (!user) {return done(null,false);}//no error, user not found
        //compare passwords
        user.comparePasswords(password, function(err, isMatched){
            if(err) {return done(err);}
            if(!isMatched) { return(null, false);}
            return done(null, user); // adds user to req.user
        })
    });
});

//=============== JWT STRATEGY ===================================
//configure JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorisation'),
    //secret to decode
    secretOrKey: config.secret
};

//create JWT strategy
//payload - decoded jwt token contents
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //if userID in payload is in database
    User.findById(payload.sub, function(err, user) {
        if (err) {return done(err, false);} //false - no user found
        if (user) {
            //if so call done
            done(null, user) //return found user object
        } else {
            //else call done without user object
            done(null, false); //no user found
        }
    });  
});

//tell passport.js to use JWT strategy
passport.use(jwtLogin);
//tesll passport to use local strategy
passport.use(localLogin);

