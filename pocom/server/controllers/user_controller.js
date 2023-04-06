const bcrypt = require('bcrypt');
const user = require('../models').user;
const saltRounds = 10;

module.exports = {
    async create(request, response) {
        try {
            const newUser = await user.create({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                mother_last_name: request.body.mother_last_name,
                email: request.body.email,
                password: bcrypt.hashSync(request.body.password, saltRounds),
                user_photo: request.body.user_photo,
                status: request.body.status,
                user_type_id: request.body.user_type_id
            });

            return response.status(200).send(newUser);
        } catch (error) {
            return response.status(400).send(error);
        }
    },

    async login(request, response) {
        try {
            const { email, password } = request.body;

            const foundUser = await user.findOne({
                where: {
                    email: email
                }
            })

            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                return response.status(200).json({
                    message: 'Logged in successfully'
                });
            }
            else {
                return response.status(401).json({
                    message: 'Invalid credentials'
                });
            }

        } catch (error) {
            return response.status(400).json({
                message: 'Error during login',
                error: error.message
            });
        }
    },

    async update(request, response) {
        try {
            const { id } = request.params;

            const foundUser = await user.findOne({
                where: {
                    id: id
                }
            });

            if (!foundUser) {
                return response.status(404).json({
                    message: 'User not found'
                });
            }

            foundUser.first_name = request.body.first_name || foundUser.first_name;
            foundUser.last_name = request.body.last_name || foundUser.last_name;
            foundUser.mother_last_name = request.body.mother_last_name || foundUser.mother_last_name;
            foundUser.email = request.body.email || foundUser.email;
            foundUser.user_photo = request.body.user_photo || foundUser.user_photo;

            await foundUser.save();

            return response.status(200).json({
                message: 'User updated successfully'
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Error during update',
                error: error.message
            })
        }
    }
}