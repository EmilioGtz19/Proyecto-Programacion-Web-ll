const communityController = require('../controllers/community_controller');
const express = require('express');
const router = express.Router();

router.post('/community/create', communityController.create);
router.get('/community/getCommunities', communityController.getCommunities);
router.get('/community/getCommunitiesByUser/:id', communityController.getCommunitiesByUser)
router.put('/community/update/:id', communityController.update);
router.delete('/community/delete/:id', communityController.delete);

module.exports = router;
