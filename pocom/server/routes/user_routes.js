const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();


router.post('/user/create', userController.create);

module.exports = router;
