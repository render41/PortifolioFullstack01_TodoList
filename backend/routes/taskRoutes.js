const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Rotas para as tarefas
router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.addTask);
router.put("/tasks/:id", taskController.updateTaskStatus);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
