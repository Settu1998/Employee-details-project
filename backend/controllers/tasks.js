const Employee = require('../models/DetailSchema');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Employee.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Employee.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Employee.findById(taskID);
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Employee.findByIdAndDelete(taskID);
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ msg: 'Task successfully deleted', task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    console.log('Updating Task with ID:', taskID);
    const task = await Employee.findById(taskID);
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    const updatedTask = await Employee.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ task: updatedTask });
});

const createEmployee = asyncWrapper(async (req, res) => {
    try {
        const { f_id, f_name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

        // Check if all required fields are provided
        if (!f_id || !f_name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        }

        // Create new employee instance
        const newEmployee = new Employee({
            f_id,
            f_name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
        });

        // Save new employee to database
        const savedEmployee = await newEmployee.save();

        res.status(201).json({ employee: savedEmployee });
    } catch (err) {
        console.error('Error creating employee:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask,
    createEmployee,
};
