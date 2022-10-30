const express = require('express')
const tasks = require('./controllers/task-controller')

const router = express.Router();
router.route("/")
    .get(tasks.getTasks)
    .post(tasks.createTask)
router.route('/:id')
    .get(tasks.getTask)
    .patch(tasks.patchTask)
    .put(tasks.updateTask)
    .delete(tasks.deleteTask)

module.exports = router;