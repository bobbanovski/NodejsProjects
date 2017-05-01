const passport = require("passport");
//link to controllers
var Authentication = require("../controllers/authentication");
const passportService = require("../services/passport");

const requireSignIn = passport.authenticate("local", { session: false});

const requireJwtAuth = passport.authenticate("jwt", 
    { session: false} ) //don't create cookie based session

module.exports = function(app){
    app.get("/", requireJwtAuth, function (req, res) {
        res.send("done");
    });

    app.post("/signin", requireSignIn, Authentication.signin);
    app.post("/signup", Authentication.signup);
}
