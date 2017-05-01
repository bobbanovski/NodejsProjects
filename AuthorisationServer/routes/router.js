//link to controllers
var Authentication = require("../controllers/authentication");

module.exports = function(app){
    app.get("/", function (req, res) {
        res.send("done");
    });

    app.post("/signup", Authentication.signup);

    
}
