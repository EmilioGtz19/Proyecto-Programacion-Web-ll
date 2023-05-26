const posts = require('../models').posts;
const user = require('../models').user;
const community = require('../models').community;

module.exports = {
    async create(request, response) {
        try {

            const newPost = await posts.create({
                title: request.body.title,
                content: request.body.content,
                photo: request.body.photo,
                community_id: request.body.community_id,
                user_id: request.body.user_id
            })

            response.status(200).send(newPost);

        } catch (error) {
            response.status(400).send(error);
        }
    },

    async getPosts(request, response) {
        try {

            const foundPosts = await posts.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'photo',
                    'community_id',
                    'user_id'
                ],
                include: [
                    {
                        model: user,
                        as: 'FK_post_user',
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'mother_last_name',
                            'user_photo'
                        ],
                    },
                    {
                        model: community,
                        as: 'FK_post_community',
                        attributes: [
                            'id',
                            'community_name',
                            'community_photo'
                        ]
                    }
                ]
            })

            response.status(200).json(foundPosts);

        } catch (error) {
            return response.status(400).json({
                message: 'Error getting posts',
                error: error.message
            })
        }
    }
}