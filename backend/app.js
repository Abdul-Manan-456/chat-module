var express = require('express');
const routes = require("./config/routes");
const connectDB = require("./config/connection");
const cors = require("cors");
const helmet = require("helmet");



var app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
require("./middlewares/base").init(app);
routes(app);
connectDB();




module.exports = app;






