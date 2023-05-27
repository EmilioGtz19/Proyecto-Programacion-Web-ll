const communityUser = require('../models').community_user;

module.exports = {

  async followOrUnfollowCommunity(request, response) {
    try {
      const { id, communityId } = request.params;

      const [follow, created] = await communityUser.findOrCreate({
        where: {
          user_id: id,
          community_id: communityId
        }
      });

      if (created) {
        response.status(200).json({follow: 1, message: 'Follow'});
      } else {
        await follow.destroy();
        response.status(200).json({follow: 0, message: 'Unfollow'});
      }
    } catch (error) {
      response.status(400).send(error);
    }
  },

  async getFollowOrUnfollow(request, response) {
    try {
      const { id, communityId } = request.params;

      const foundFollow = await communityUser.findOne({
        where: {
          user_id: id,
          community_id: communityId
        }
      })

      if(foundFollow){
        response.status(200).json({follow: 1});
      }else{
        response.status(200).json({follow: 0});
      }

    } catch (error) {
      response.status(400).send(error);
    }
  }

}
