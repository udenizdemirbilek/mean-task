const Task = require("../models/task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const taskQuery = Task.find();
  if (pageSize && currentPage) {
    taskQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  try {
    const tasks = await taskQuery;
    const count = await Task.count();
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: tasks,
      taskCount: count,
    });
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
