const express = require('express')
const Controller = require('../controllers/controller')
const authorsRouter = require('./authors')
const postsRouter = require('./posts')

const router = express.Router()

router.get('/', Controller.home)
router.use('/authors', authorsRouter)
router.use('/posts', postsRouter)


module.exports = router