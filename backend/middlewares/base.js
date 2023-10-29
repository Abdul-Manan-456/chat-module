"use-strict";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { httpsCodes } = require("../config/contant");
const { language } = require("../language/en/language");
const { unless } = require("express-unless");
const { verifyJWTToken } = require("../modules/helper");
const path = require('path')
const { unlessRoutes } = require("../config/unlessRoutes");
const { v2: cloudinary } = require("cloudinary");

// const { v2 } = require("cloudinary");
const fileUpload = require("express-fileupload");

class Base {
  constructor() {}
  static init(app) {
    cloudinary.config({
      cloud_name: "ddzieso69",
      api_key: "789994577331923",
      api_secret: "klpFa0aVCvj3QDmUmbU981Civio",
    });
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
    app.use(cookieParser());
    app.use(express.static("public"));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
    Base.authenticate.unless = unless;
    app.use(Base.authenticate.unless(unlessRoutes));
    Base.cloudinary = cloudinary;

    // app.use(isAdmin);
  }

  static async authenticate(req, res, next) {
    const token = req?.headers?.token;
    if (token) {
      const result = await verifyJWTToken(token);
      if (result.err) {
        res
          .status(httpsCodes.UNAUTHORIZE_CODE)
          .json({ message: language.INVALID_AUTH_TOKEN });
      } else {
        req.user = result.decoded;
        next();
      }
    } else {
      if (`${req?.originalUrl}` == "/api/v2/checkout" && req.method == "POST") {
        next();
      } else {
        res
          .status(httpsCodes.UNAUTHORIZE_CODE)
          .json({ message: language.NO_AUTH_GIVEN });
      }
    }
  }
}

module.exports = Base;
