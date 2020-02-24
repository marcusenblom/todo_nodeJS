"use strict";

var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    }
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;