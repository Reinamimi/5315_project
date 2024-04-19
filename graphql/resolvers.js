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
