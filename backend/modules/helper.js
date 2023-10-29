"use strict";

const jwt = require("jsonwebtoken");

module.exports.verifyJWTToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decoded) => {
    return { err: err, decoded: decoded };
  });
};
