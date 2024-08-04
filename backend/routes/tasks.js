const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    createEmployee
} = require('../controllers/tasks');

// Routes for '/api/v1/tasks'
router.route('/')
    .get(getAllTasks) // GET all tasks
    .post(createTask); // POST a new task

// Routes for '/api/v1/tasks/:id'
router.route('/:id')
    .get(getTask) // GET a task by ID
    .put(updateTask) // PATCH (partial update) a task by ID
    .delete(deleteTask); // DELETE a task by ID

// Route to create a new employee
router.post('/employees', createEmployee);

module.exports = router;
