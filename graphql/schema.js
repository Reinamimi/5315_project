const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Address {
    building: String
    coord: [Float]!
    street: String
    zipcode: String
  }

  type Grade {
    date: String
    grade: String
    score: Int
  }

  type Restaurant {
    _id: ID!
    address: Address
    borough: String
    cuisine: String
    grades: [Grade]
    name: String
    restaurant_id: String
  }

  input RestaurantInput {
    address: AddressInput
    borough: String
    cuisine: String
    grades: [GradeInput]
    name: String
    restaurant_id: String
  }

  input AddressInput {
    building: String
    coord: [Float]!
    street: String
    zipcode: String
  }

  input GradeInput {
    date: String
    grade: String
    score: Int
  }

  type Query {
    restaurants(borough: String): [Restaurant!]!
    restaurant(id: ID!): Restaurant
  }

  type Mutation {
    createRestaurant(input: RestaurantInput!): Restaurant
  }
`;

module.exports = typeDefs;
