const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Taskmodel = require("../../Models/task/task");

// Create task
const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;

        // Check required fields
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required!" });
        }

        if (!description || description.trim() === "") {
            return res.status(400).json({ message: "Description is required!" });
        }

        // Create task object
        const task = new Taskmodel({
            title,
            description,
            dueDate,
            status,
            priority,
            user: req.user._id,
        });

        // Save task to database
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error while creating task.", error: error.message });
    }
});

// Get tasks
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Taskmodel.find({ user: req.user._id });
        if (tasks.length > 0) {
            return res.status(200).json({ length: tasks.length, tasks });
        } else {
            return res.status(404).json({ message: "No tasks found for this user." });
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Server error while fetching tasks." });
    }
});

// Single task
const singleTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to view this task!" });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, status, completed } = req.body;

        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed !== undefined ? completed : task.completed; // Update only if provided

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        await Taskmodel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the functions
module.exports = {
    createTask,
    getTasks,
    singleTask,
    updateTask,
    deleteTask,
};
