var mongoose = require("mongoose");
var campsiteSchema = new mongoose.Schema({
    name: String,
    location: String,
    costPerNight: Number,
    image: String
});
module.exports = mongoose.model("Campsite", campsiteSchema);