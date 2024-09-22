import TaskSchema, { validateCreateTask, validateUpdateTask } from "../models/Task.js"

export const getTaskCtrl = async (req, res) => {
    const task = await TaskSchema.find({ listId: req.params.listId }).sort({ createdAt: -1 })
    if (!task) {
        return res.status(400).json({ message: "Task not found" })
    }
    res.status(200).json(task)
}

export const createTaskCtrl = async (req, res) => {
    const { error } = validateCreateTask(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const task = new TaskSchema({ text:req.body.text, status:req.body.status, user: req.user.id, listId: req.body.listId })
    await task.save()
    res.status(201).json({ message: "Task created successfully" })
}

export const updateTaskCtrl = async (req, res) => {
    const { error } = validateUpdateTask(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const task = await TaskSchema.findOne({ _id: req.params.taskId })
    if (!task) {
        return res.status(400).json({ message: "Task not found" })
    }
    await TaskSchema.findOneAndUpdate({ _id: req.params.taskId }, { text: req.body.text, status: req.body.status })
    res.status(200).json({ message: "Task updated successfully" })
}

export const deleteTaskCtrl = async (req, res) => {
    const task = await TaskSchema.findOne({ _id: req.params.taskId })
    if (!task) {
        return res.status(400).json({ message: "Task not found" })
    }
    await TaskSchema.findOneAndDelete({ _id: req.params.taskId })
    res.status(200).json({ message: "Task deleted successfully" })
}