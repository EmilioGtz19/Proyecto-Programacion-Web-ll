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

                const { id, user_photo } = foundUser

                request.session.user = { id, user_photo }

                return response.status(200).json({
                    message: 'Logged in successfully'
                });
            } else {
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
    },

    async getUser(request, response) {
        try {
            const { id } = request.params;

            const foundUser = await user.findOne({
                where: {
                    id: id
                },
                attributes: [
                    'first_name',
                    'last_name',
                    'mother_last_name',
                    'email',
                    'user_photo'
                ]
            })

            if (!foundUser) {
                return response.status(404).json({
                    message: 'User not found'
                });
            }

            return response.status(200).json({
                user: foundUser
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Error getting user',
                error: error.message
            })
        }
    },

    async getSession(request, response) {
        if (request.session.user) {
            response.send({ loggedIn: true, user: request.session.user })
        } else {
            response.send({ loggedIn: false });
        }
    },

    async destroySession(request, response) {
        request.session.destroy();
        response.send({ loggedIn: false })
    },

    async updatePass(request, response) {
        try {
            const { id } = request.params;
            const { old_pass, new_pass } = request.body;

            const foundUser = await user.findOne({
                where: { id }
            });

            if (!foundUser) {
                return response.status(404).json({ message: "User not found" });
            }

            if (!new_pass) {
                return response
                    .status(400)
                    .json({ message: "New password is required" });
            }

            if (bcrypt.compareSync(old_pass, foundUser.password)) {
                const newPassHash = bcrypt.hashSync(new_pass, saltRounds);
                foundUser.password = newPassHash;
                await foundUser.save();
                return response.status(200).json({ message: "Password updated" });
            } else {
                return response
                    .status(400)
                    .json({ message: "Passwords do not match" });
            }
        } catch (error) {
            return response.status(400).json({
                message: "Error during update pass",
                error: error.message,
            });
        }
    }
}