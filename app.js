require ('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { body, query, validationResult } = require("express-validator");
const connection = require("./config/connection");
const { engine } = require("express-handlebars");
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const bodyParser = require("body-parser"); // pull information from HTML POST (express4)

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.engine(
    ".hbs",
    engine({
      extname: ".hbs",
      layoutsDir: false,
    })
  );
  app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

// Initialize MongoDB connection
const db = require("./db");

// Middleware
// app.use(express.json()); a

// Routes
app.post("/api/restaurants", async (req, res) => {
  try {
    const newRestaurant = await db.addNewRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get(
//   "/api/restaurants",
//   [
//     query("page")
//       .isInt({ min: 1 })
//       .withMessage("Page must be a positive integer"),
//     query("perPage")
//       .isInt({ min: 1 })
//       .withMessage("PerPage must be a positive integer"),
//     query("borough")
//       .optional()
//       .isString()
//       .withMessage("Borough must be a string"),
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     },
//   ],
//   async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const perPage = parseInt(req.query.perPage) || 10;
//       const borough = req.query.borough || null;
//       const restaurants = await db.getAllRestaurants(page, perPage, borough);
//       res.json(restaurants);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.getRestaurantById(req.params.id);
    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });
    } else {
      res.json(restaurant);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/restaurants/:id", async (req, res) => {
  try {
    const updatedRestaurant = await db.updateRestaurantById(
      req.body,
      req.params.id
    );
    if (!updatedRestaurant) {
      res.status(404).json({ error: "Restaurant not found" });
    } else {
      res.json(updatedRestaurant);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    const deletedRestaurant = await db.deleteRestaurantById(req.params.id);
    
    if (!deletedRestaurant) {
      res.status(404).json({ error: "Restaurant does not exist" });
    } else {
    res.json({ message: "Restaurant deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


    // GET route to render the form
    app.get('/restaurants', (req, res) => {
      res.render('restaurantsForm', {layout : false});
  });

  // GET route to handle form submission and display results
  app.get('/api/restaurants', 
      [
        query('page').isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('perPage').isInt({ min: 1 }).withMessage('PerPage must be a positive integer'),
        query('borough').optional().isString().withMessage('Borough must be a string'),
          (req, res, next) => {
              const errors = validationResult(req);
              console.log(req.query);
              if (!errors.isEmpty()) {
                console.log({ errors: errors.array() })
                  return res.render('restaurantsForm',{layout : false});
              }
              next();
          }
      ],
      async (req, res) => {
          try {
              const page = parseInt(req.query.page) || 1;
              const perPage = parseInt(req.query.perPage) || 10;
              const borough = req.query.borough || null;
              const restaurants = await db.getAllRestaurants(page, perPage, borough);
              console.log(restaurants[1])
              res.render('restaurantsForm', { restaurants, layout : false });
          } catch (err) {
              res.status(500).json({ error: err.message });
          }
      }
  );

// Start server
db.initialize(connection.url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });