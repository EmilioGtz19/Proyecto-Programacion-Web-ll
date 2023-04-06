const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('/user/create', userController.create);
router.post('/user/login', userController.login);
router.put('/user/update/:id', userController.update);

module.exports = router;
