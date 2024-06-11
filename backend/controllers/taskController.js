const taskModel = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  const tasks = await taskModel.getTasks();
  res.json(tasks);
};

const addTask = async (req, res) => {
  const { description } = req.body;
  const newTask = await taskModel.createTask(description);
  res.status(201).json(newTask);
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTask = await taskModel.updateTask(id, completed);
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await taskModel.deleteTask(id);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
};
