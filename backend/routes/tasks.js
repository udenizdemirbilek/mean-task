const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a single task
router.get("/:id", taskController.getTaskById);

// Create a task
router.post("/", taskController.createTask);

// Update a task
router.put("/:id", taskController.updateTask);

// Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
