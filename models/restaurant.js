const mongoose = require("mongoose");

// Define schema
const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: [Number], // Array of Numbers
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;