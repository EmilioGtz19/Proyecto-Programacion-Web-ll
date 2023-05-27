const communityController = require('../controllers/community_controller');
const express = require('express');
const router = express.Router();

router.post('/community/create', communityController.create);
router.get('/community/getCommunities', communityController.getCommunities);
router.get('/community/getCommunitiesByUser/:id', communityController.getCommunitiesByUser);
router.get('/community/getCommunityById/:id', communityController.getCommunityById);
router.get('/community/getCommunityByName/:community_name', communityController.getCommunityByName);
router.put('/community/update/:id', communityController.update);
router.put('/community/logicalDelete/:id', communityController.logicalDelete);
router.delete('/community/delete/:id', communityController.delete);

module.exports = router;
