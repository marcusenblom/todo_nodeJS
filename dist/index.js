"use strict";

var express = require("express");
var mongoose = require("mongoose");
var router = require("./router/todoRouter");
var bodyParser = require("body-parser");
var config = require("./config/config");
var path = require("path");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // In order to make css file work
app.set("views", "views"); // What folder to look in. Views folder (2nd) can be named to anything
app.set("view engine", "ejs"); // Describe what Express will find/use in the above folder

// Middleware

// Router
app.use(router);

// Listen to port
var PORT = process.env.PORT || 7000;

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.databaseURL, options).then(function () {
    console.log("connecting to port: " + PORT + "...");
    app.listen(PORT);
    console.log("connection successful");
});