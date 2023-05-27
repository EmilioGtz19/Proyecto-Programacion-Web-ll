const likesController = require('../controllers/likes_controller')
const express = require('express');
const router = express.Router();

router.post('/likes/createOrUpdateStatus/:userId/:postId/:status', likesController.createOrUpdateStatus);

module.exports = router
