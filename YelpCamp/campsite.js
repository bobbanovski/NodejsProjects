var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/campsites");

var campsiteSchema = new mongoose.Schema({
    name: String,
    location: String,
    costPerNight: Number
});

//Create collection called Campsites
//Add the ODM methods
var Campsite = mongoose.model("Campsite", campsiteSchema);

//add new campsite to database
var addSite = new Campsite({
    name: "Valley Forge",
    location: "Pennsylvania",
    costPerNight: 52
});
// addSite.save(function(error, campsite){
//     if(error){
//         console.log("site not saved")
//     } else {
//         console.log("saved to db");
//         console.log(campsite);
//     }
// });

//retrieve campsite from database
Campsite.find({}, function(err, campsites){
    if(err) {
        console.log("Not Found");
        console.error(err);
    } else {
        console.log(campsites);
    }
})

//creates and saves new object
Campsite.create({
    name: "Bates Hotel",
    location: "California",
    costPerNight: 10
})