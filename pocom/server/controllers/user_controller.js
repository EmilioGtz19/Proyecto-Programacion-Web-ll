const bcrypt = require('bcrypt');
const user = require('../models').user;

const saltRounds = 10;

module.exports = {
    create(request, response){
        return user
            .create({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                mother_last_name: request.body.mother_last_name,
                email: request.body.email,
                password: bcrypt.hashSync(request.body.password, saltRounds),
                user_photo: request.body.user_photo,
                status: request.body.status,
                user_type_id: request.body.user_type_id
            })
            .then(user =>
                response.status(200).send(user))
            .catch(error => response.status(400).send(error))
    }

}