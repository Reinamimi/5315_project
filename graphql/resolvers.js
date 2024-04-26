/******************************************************************************
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber AcademicPolicy.
 * No part of this assignment has been copied manually or electronically from any othersource
 * (including web sites) or distributed to other students.
 * Name: Reina Ezeabasilim
 * Student ID: N01523401
 * Date: 17th April 2024
 * ******************************************************************************/

const Restaurant = require('../models/restaurant');

const resolvers = {
  Query: {
    restaurants: async () => await Restaurant.find(),
    restaurant: async (parent, { id }) => await Restaurant.findById(id),
  },
  Mutation: {
    createRestaurant: async (parent, { input }) => {
      const newRestaurant = new Restaurant(input);
      return await newRestaurant.save();
    },
  },
};

module.exports = resolvers;
