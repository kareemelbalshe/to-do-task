import ListSchema, { validateCreateList, validateUpdateList } from "../models/List.js"
import TaskSchema from "../models/Task.js"

export const getListCtrl = async (req, res) => {
    const list = await ListSchema.find({ user: req.user.id })
    if (!list) {
        return res.status(400).json({ message: "List not found" })
    }
    res.status(200).json(list)
}

export const createListCtrl = async (req, res) => {
    const { error } = validateCreateList(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const list = new ListSchema({ title: req.body.title, user: req.user.id })
    await list.save()
    res.status(201).json({ message: "List created successfully" })
}

export const updateListCtrl = async (req, res) => {
    const { error } = validateUpdateList(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const list = await ListSchema.findOne({ _id: req.params.listId })
    if (!list) {
        return res.status(400).json({ message: "List not found" })
    }
    list.title = req.body.title
    await list.save()
    res.status(200).json({ message: "List updated successfully" })
}

export const deleteListCtrl = async (req, res) => {
    const list = await ListSchema.findOne({ _id: req.params.listId })
    if (!list) {
        return res.status(400).json({ message: "List not found" })
    }
    await TaskSchema.deleteMany({ listId: list._id })
    await ListSchema.findOneAndDelete({ _id: req.params.listId })
    res.status(200).json({ message: "List deleted successfully" })
}