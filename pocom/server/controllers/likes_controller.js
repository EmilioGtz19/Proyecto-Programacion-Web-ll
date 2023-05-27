const likes = require('../models').like;

module.exports = {
    async createOrUpdateStatus(request, response){
        try{
            const {userId, postId, status} = request.params;

            const foundLike = await likes.findOne({
                where:{
                    user_id: userId,
                    post_id: postId,
                }
            })

            if(!foundLike){
                const newLike = await likes.create({
                    user_id: userId,
                    post_id: postId,
                    status: status
                })

                response.status(200).send(newLike)
            }
            else{
                if(foundLike.status != status){
                    foundLike.status = status || foundLike.status
                    await foundLike.save()
                    response.status(200).json({
                        message: 'Like updated successfully'
                    })
                }
                else{
                    await likes.destroy({
                        where: {
                            user_id: userId,
                            post_id: postId,
                            status: status
                        }
                    })
                    response.status(204).send();
                }
            }
        }
        catch(error){
            response.status(400).send(error)
        }
    }
}