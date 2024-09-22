import express from 'express'
import { registerUserCtrl, loginUserCtrl } from '../controller/authController.js'

const router = express.Router()

router.post('/register', registerUserCtrl)
router.post('/login', loginUserCtrl)

export default router