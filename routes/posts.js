const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.post)
router.get('/add', Controller.addPostView)
router.post('/add', Controller.addPost)
router.get('/:id', Controller.postById)
router.get('/:id/edit', Controller.editPostByIdView)
router.post('/:id/edit', Controller.editPostById)
router.get('/:id/delete', Controller.deletePostById)
router.get('/:id/vote', Controller.votePostById)






module.exports = router