const express = require("express");
const todoControllers = require("../controllers/todo.controllers");

const router = express.Router();

// group edit endpoints
router.patch("/status", todoControllers.updateTodosStatus);

router.get("/:list", todoControllers.getTodos);
router.post("/", todoControllers.addTodo);
router.delete("/:id", todoControllers.deleteTodo);
router.patch("/:id", todoControllers.updateTodo);
router.patch("/:id/status", todoControllers.updateTodoStatus);

module.exports = router;
