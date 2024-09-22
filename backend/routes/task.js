import express from 'express'
import { getTaskCtrl, createTaskCtrl, updateTaskCtrl, deleteTaskCtrl } from '../controller/taskController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

router.get('/:listId', verifyToken, getTaskCtrl)
router.post('/:listId', verifyToken, createTaskCtrl)
router.put('/:taskId', verifyToken, updateTaskCtrl)
router.delete('/:taskId', verifyToken, deleteTaskCtrl)

export default router