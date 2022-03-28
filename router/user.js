const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

router.post('/register',userHandler.register)
router.post('/login',userHandler.login)
router.get('/getInfo',userHandler.getInfo)
router.get('/getUsers',userHandler.getUsers)

module.exports = router