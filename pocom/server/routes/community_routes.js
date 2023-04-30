const communityController = require('../controllers/community_controller');
const express = require('express');
const router = express.Router();

router.post('/community/create', communityController.create);
router.get('/community/getCommunities', communityController.getCommunities);
router.put('/community/update/:id', communityController.update);
router.delete('/community/delete/:id', communityController.delete);

module.exports = router;
