import { Router } from 'express'
import userController from '../controllers/userController'
//const userController = require('../controllers/userController')

const router = Router()

//rotas
router.post('/', userController.create)

export default router
