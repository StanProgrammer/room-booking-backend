const express = require('express')
const { getRooms, bookRoom} = require('../controllers/roomContoller')
const validateToken = require('../middleware/auth')
const router = express.Router()
router.get('/rooms',validateToken,getRooms)
router.post('/book',validateToken,bookRoom)
module.exports = router