"use strict";

const jwt = require("jsonwebtoken");

module.exports.generateToken = (userData) => {
  const payLoad = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
  };

  return jwt.sign(payLoad, process.env.JWT_SECRETE_KEY, { expiresIn: "10h" });
};
