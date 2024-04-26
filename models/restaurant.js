/******************************************************************************
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber AcademicPolicy.
 * No part of this assignment has been copied manually or electronically from any othersource
 * (including web sites) or distributed to other students.
 * Name: Reina Ezeabasilim
 * Student ID: N01523401
 * Date: 17th April 2024
 * ******************************************************************************/

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