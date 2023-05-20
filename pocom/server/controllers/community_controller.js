const community = require('../models').community;

module.exports = {
    async create(request, response) {
        try {
            const newCommunity = await community.create({
                community_name: request.body.community_name,
                community_description: request.body.community_description,
                community_photo: request.body.community_photo,
                user_id: request.body.user_id
            });

            response.status(200).send(newCommunity);
        } catch (error) {
            response.status(400).send(error);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            const deleteCommunity = await community.destroy({
                where: { id }
            })

            if (deleteCommunity == 0) {
                response.status(404).send('Community not found');
            } else {
                response.status(204).send();
            }

        } catch (error) {
            response.status(400).send(error);
        }
    },

    async update(request, response) {
        try {
            const { id } = request.params;

            const foundCommunity = await community.findOne({
                where: {
                    id: id
                }
            });

            if (!foundCommunity) {
                return response.status(404).json({
                    message: 'Community not found'
                });
            }

            foundCommunity.community_name = request.body.community_name || foundCommunity.community_name;
            foundCommunity.community_description = request.body.community_description || foundCommunity.community_description;
            foundCommunity.community_photo = request.body.community_photo || foundCommunity.user_photo;


            await foundCommunity.save();

            return response.status(200).json({
                message: 'Community updated successfully'
            });

        } catch (error) {
            return response.status(400).send(error)
        }
    },
    
    async getCommunities(request, response) {
        try {

            const foundCommunities = await community.findAll({
                attributes: [
                    'id', 
                    'community_name',
                    'community_description',
                    'community_photo'
                ],
                where: {
                    status : 1
                }
            })

            response.status(200).json(foundCommunities);

        } catch (error) {
            return response.status(400).json({
                message: 'Error getting communities',
                error: error.message
            })
        }
    },

    async getCommunitiesByUser(request, response) {
        try{

            const { id } = request.params;

            const foundCommunities = await community.findAll({
                where: {
                    user_id: id,
                    status : 1
                },
                attributes: [
                    'id',
                    'community_name',
                    'community_description',
                    'community_photo'
                ]
            })


            response.status(200).json(foundCommunities);

        }catch(error){
            return response.status(400).json({
                message: 'Error getting communities',
                error: error.message
            })
        }
    },

    async logicalDelete(request, response){
        try {
            const { id } = request.params;

            const foundCommunity = await community.findOne({
                where: {
                    id: id
                }
            });

            if (!foundCommunity) {
                return response.status(404).json({
                    message: 'Community not found'
                });
            }

            foundCommunity.status = 0;

            await foundCommunity.save();

            return response.status(200).json({
                message: 'Community deleted successfully'
            });

        } catch (error) {
            response.status(400).send(error);
        }
    }
}