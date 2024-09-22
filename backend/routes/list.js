import express from 'express'
import { getListCtrl, createListCtrl, updateListCtrl, deleteListCtrl } from '../controller/listController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router()

router.get('/', verifyToken, getListCtrl)
router.post('/', verifyToken, createListCtrl)
router.put('/:listId', verifyToken, updateListCtrl)
router.delete('/:listId', verifyToken, deleteListCtrl)

export default router