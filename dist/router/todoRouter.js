"use strict";

var express = require("express");
var Todo = require("../model/todo"); // Imported model

var router = express.Router();

// GET TODOS
router.get("/todos", async function (req, res) {

    var allTodos = await Todo.find(); // Model name + .find() will find all objects within that model
    res.render("todos.ejs", { allTodos: allTodos });
});

// POST TODOS
router.post("/todos", async function (req, res) {

    var todo = new Todo({
        title: req.body.title
    });
    await todo.save(function (error, success) {
        // User input validation
        if (error) {
            res.send(error.message);
        }
    });

    res.redirect("/todos");
});

// UPDATE TODO
router.get("/update/:id", async function (req, res) {

    var todoToUpdate = await Todo.findById({ _id: req.params.id }); // todoToUpdate = object containing a todo found by ID. "req.params.id" matches "/update/:id". :id must be same as .id
    res.render("edit", { todoToUpdate: todoToUpdate });
});
router.post("/update/:id", async function (req, res) {

    await Todo.updateOne({ _id: req.params.id }, { $set: { title: req.body.newTitle } }); // Find the id of the same object as is updated on the page and set new values to the properties

    res.redirect("/todos");
});

// DELETE TODO
router.get("/delete/:id", async function (req, res) {

    await Todo.deleteOne({ _id: req.params.id }); // Finds and remove one todo from the DB. {_id: req.params.id} comes from the DB and _id: is a property of the todo and req.params.id is the user input which in this case comes from the URL parameter delete/:id
    res.redirect("/todos"); // Sends user back to the same page as they were on
});

module.exports = router;