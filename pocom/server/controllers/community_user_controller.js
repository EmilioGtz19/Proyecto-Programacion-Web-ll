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
            response.status(200).send(follow);
          } else {
            await follow.destroy();
            response.status(200).send(follow);
          }
        } catch (error) {
          response.status(400).send(error);
        }
      }
}
