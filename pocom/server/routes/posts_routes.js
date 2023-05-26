const postController = require('../controllers/posts_controller');
const express = require('express');
const router = express.Router();

router.post('/posts/create', postController.create);
router.get('/posts/getPosts', postController.getPosts);

module.exports = router;
