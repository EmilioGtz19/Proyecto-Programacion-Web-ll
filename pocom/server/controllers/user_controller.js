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
    },

    async login(request, response){
        try{
            const { email, password } = request.body;

            const foundUser = await user.findOne({
                where: {
                    email: email
                }
            })

            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                response.status(200).json({
                    message: 'Logged in successfully'
                  });
            }
            else{
                response.status(401).json({
                    message: 'Invalid credentials'
                });
            }

        }catch(error){
            response.status(400).json({
                message: 'Error during login',
                error: error.message
            });
        }
    }
}