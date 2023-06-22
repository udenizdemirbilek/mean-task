const Task = require("../models/task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single task
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndRemove(taskId);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
