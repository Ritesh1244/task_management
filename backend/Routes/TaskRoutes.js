const express = require('express');
const { createTask, getTasks, singleTask, updateTask, deleteTask } = require('../Controllers/Task/TaskController.js');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = express.Router();

// Define the routes and the callback functions
router.post('/create', ensureAuthenticated, createTask); // Create task route
router.get('/alltasks', ensureAuthenticated, getTasks); // Get tasks route
router.get('/:id', ensureAuthenticated, singleTask); // Single task route
router.patch('/:id', ensureAuthenticated, updateTask); // Update tasks route
router.delete('/:id', ensureAuthenticated, deleteTask); // Delete tasks route

// Export the router
module.exports = router;
