const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/todoRouter");
const bodyParser = require("body-parser");
const config = require("./config/config");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));       // In order to make css file work
app.set("views", "views"); // What folder to look in. Views folder (2nd) can be named to anything
app.set("view engine", "ejs"); // Describe what Express will find/use in the above folder

// Middleware

// Router
app.use(router);

// Listen to port
const PORT = process.env.PORT || 7000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.databaseURL, options).then( () => {
    console.log(`connecting to port: ${PORT}...`);
    app.listen(PORT);
    console.log(`connection successful`);
});