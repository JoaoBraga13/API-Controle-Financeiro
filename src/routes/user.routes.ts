const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//rotas
router.post('/', userController.create)

module.exports = router
