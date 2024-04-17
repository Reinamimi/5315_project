const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant'); // Define your Restaurant model

async function initialize(connectionUri) {
    try {
        await mongoose.connect(connectionUri);
        console.log('Connected to MongoDB');

    } catch (err) {
        throw new Error('Failed to connect to MongoDB');
    }
}

async function addNewRestaurant(data) {
    try {
        const newRestaurant = await Restaurant.create(data);
        return newRestaurant;
    } catch (error) {
        throw new Error('Failed to add new restaurant');
    }
}

async function getAllRestaurants(page, perPage, borough) {
    try {
        // Calculate the number of documents to skip based on the current page and perPage
        const skip = (page - 1) * perPage;

        // Start building the query
        let query = Restaurant.find();

        // Apply filtering by borough if provided
        if (borough) {
            query = query.where('borough').equals(borough);
        }

        // Sort the results by restaurant_id in ascending order
        query = query.sort({ restaurant_id: 1 });

        // Skip the calculated number of documents and limit the number of documents per page
        query = query.skip(skip).limit(perPage).lean();

        // Execute the query and return the result
        const restaurants = await query.exec();
        return restaurants;
    } catch (err) {
        throw new Error('Failed to get all restaurants');
    }
}

async function getRestaurantById(id) {
    try {
        const restaurant = await Restaurant.findById(id);
        return restaurant;
    } catch (err) {
        throw new Error('Failed to get restaurant by ID');
    }
}

async function updateRestaurantById(data, id) {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, data, { new: true });
        return updatedRestaurant;
    } catch (err) {
        throw new Error('Failed to update restaurant by ID');
    }
}

async function deleteRestaurantById(id) {
    try {
        await Restaurant.findByIdAndDelete(id);
    } catch (err) {
        throw new Error('Failed to delete restaurant by ID');
    }
}

module.exports = {
    initialize,
    addNewRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
};
