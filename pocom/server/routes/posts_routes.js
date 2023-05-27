const postController = require('../controllers/posts_controller');
const express = require('express');
const router = express.Router();

router.post('/posts/create', postController.create);
router.get('/posts/getPosts', postController.getPosts);
router.get('/posts/getPostsByCommunityId/:communityId', postController.getPostsByCommunityId);
router.put('/posts/updatePosts/:id', postController.updatePosts);

module.exports = router;
