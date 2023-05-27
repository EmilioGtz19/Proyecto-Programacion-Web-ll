const community_user = require('../models/community_user');

const posts = require('../models').posts;
const user = require('../models').user;
const communityUser = require('../models').community_user
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
    },

    async updatePosts(request, response) {
        try {
            const { id } = request.params;

            const foundPost = await posts.findOne({
                where: {
                    id: id
                }
            });

            if (!foundPost) {
                response.status(404).json({
                    message: 'Post not found'
                });
            }

            foundPost.title = request.body.title || foundPost.title;
            foundPost.content = request.body.content || foundPost.content;
            foundPost.photo = request.body.photo || foundPost.photo;

            await foundPost.save();

            response.status(200).json({
                message: 'Post updated successfully'
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Error during update',
                error: error.message
            })
        }
    },

    async getPostsByCommunityId(request, response) {
        try {
            const { communityId } = request.params

            const foundPosts = await posts.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'photo',
                    'createdAt',
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
                ],
                where: {
                    community_id: communityId
                }
            })

            response.status(200).json(foundPosts);

        } catch (error) {
            return response.status(400).json({
                message: 'Error getting posts',
                error: error.message
            })
        }
    },

    async getPostsByUsersFollows(request, response) {
        try {

            const { userId } = request.params

            const foundFollows = await communityUser.findAll({
                attributes: [
                    'user_id',
                    'community_id'
                ],
                include: [
                    {
                        model: community,
                        as: 'FK_community_user_community',
                        attributes: [
                            'id',
                            'community_name',
                            'community_photo'
                        ]
                    },
                    {
                        model: user,
                        as: 'FK_community_user_user_type',
                        attributes: [
                            'id',
                            'user_photo',
                            'first_name'
                        ]
                    }
                ],
                where: {
                    user_id: userId
                }
            });

            const foundPosts = await posts.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'photo',
                    'community_id',
                    'user_id',
                    'createdAt'
                ]
            })

            const communityIds = foundFollows.map((follow) => follow.FK_community_user_community.id);

            // Filtrar los foundPosts por community_id
            const filteredPosts = foundPosts
                .filter((post) => communityIds.includes(post.community_id))
                .map((post) => {
                    const community = foundFollows.find((follow) => follow.FK_community_user_community.id === post.community_id);
                    const user = foundFollows.find((follow) => follow.FK_community_user_user_type.id === post.user_id);

                    return {
                        ...post,
                        community_info: {
                            id: community.FK_community_user_community.id,
                            community_name: community.FK_community_user_community.community_name,
                            community_photo: community.FK_community_user_community.community_photo
                        },
                        user_info: {
                            id: user.FK_community_user_user_type.id,
                            user_photo: user.FK_community_user_user_type.user_photo,
                            first_name: user.FK_community_user_user_type.first_name
                        }
                    };
                });

            response.status(200).json(filteredPosts);

        } catch (error) {
            console.log(error.message);
        }
    }
}