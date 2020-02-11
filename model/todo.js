const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        minlength: 2
    }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;