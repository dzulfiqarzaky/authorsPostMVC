const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.author)
router.get('/detail', Controller.authorDetail)




module.exports = router