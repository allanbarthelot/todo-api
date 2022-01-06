const Todo = require("../models/todo");

const addTodo = async (req, res) => {
    const todo = new Todo({
        label: req.body.label,
        done: req.body.done,
        tags: req.body.tags,
        list: req.body.list,
    });

    const user = req.decoded.id;

    todo.author = user;

    try {
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};

const getTodos = async (req, res) => {
    const user = req.decoded.id;

    const list = req.params.list;

    try {
        const todos = await Todo.find({author: user, list: list});
        res.json(todos);
    } catch (err) {
        res.send("error");
    }
};

const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.deleteOne({_id: req.params.id});
        res.json(deletedTodo);
    } catch (err) {
        res.send("error");
    }
};

const updateTodo = async (req, res) => {
    console.log("req", req.body);

    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.id},
            {label: req.body.label, tags: req.body.tags}
        );

        res.json(updatedTodo);
    } catch (err) {
        res.send("error");
    }
};

const updateTodoStatus = async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.id},
            {done: req.body.done}
        );

        res.json(updatedTodo);
    } catch (err) {
        res.send("error");
    }
};

const updateTodosStatus = async (req, res) => {
    try {

        const updatedTodos = await Todo.updateMany({_id: {$in: req.body.todos || []}},
            { $set: {done: req.body.status} })

        console.log("updatedTodos", updatedTodos)
        res.json(updatedTodos);
    } catch (err) {
        console.log("error", err)
        res.send("error");
    }
}

module.exports = {
    addTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    updateTodoStatus,
    updateTodosStatus,
};
