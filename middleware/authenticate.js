/******************************************************************************
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber AcademicPolicy.
 * No part of this assignment has been copied manually or electronically from any othersource
 * (including web sites) or distributed to other students.
 * Name: Reina Ezeabasilim
 * Student ID: N01523401
 * Date: 17th April 2024
 * ******************************************************************************/

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
