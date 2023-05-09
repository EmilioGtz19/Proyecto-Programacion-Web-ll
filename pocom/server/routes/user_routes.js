const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('/user/create', userController.create);
router.post('/user/login', userController.login);
router.post('/user/updatePass/:id', userController.updatePass);
router.put('/user/update/:id', userController.update);
router.get('/user/getUser/:id', userController.getUser);
router.get('/user/getSession', userController.getSession);
router.get('/user/destroySession', userController.destroySession);

module.exports = router;
