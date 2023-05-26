const communityUserController = require('../controllers/community_user_controller');
const express = require('express');
const router = express.Router();

router.post('/community_user/followOrUnfollowCommunity/:id/:communityId', communityUserController.followOrUnfollowCommunity);
router.get('/community_user/getFollowOrUnfollow/:id/:communityId', communityUserController.getFollowOrUnfollow);

module.exports = router;
