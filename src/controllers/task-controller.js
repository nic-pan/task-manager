// mongo connection

const Task = require("../models/Task")

const getTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks})
}

const getTask = async (req, res) => {
    const id = req.params['id']
    const task = await Task.findById(id)
    res.status(200).json({task})
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(err) {
        res.status(400).json({message: err.errors.name.message})
    }
}

const patchTask = async (req, res) => {
    try {
        const id = req.params['id'];
        const task = await Task.findOneAndUpdate({_id: id}, req.body, {
            new: true, 
            runValidators: true
        });
        if (!task) return res.status(404).json({message: `Task with ID ${id} was not found.`})
        res.status(200).json({task});
    } catch(error) {

    }
}

const updateTask = (req, res) => {
    const id = req.params['id'];

}

const deleteTask = async (req, res) => {
    const id = req.params['id'];
    const task = await Task.findOneAndDelete({id})
    res.status(200).json({task});
}

module.exports = {getTasks, getTask, createTask, updateTask, patchTask, deleteTask}