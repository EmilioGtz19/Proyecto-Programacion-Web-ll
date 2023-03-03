const LoginModel = require('../models/login_model')

class LoginController {

    static async login(request, response){
        const data = request.body;
        const result = await LoginModel.login(data);

        if (result.success){
            response.status(200).send({message: result.message})
        } else{
            response.status(401).send({status:'error', message: result.message})
        }
    }

}

module.exports = LoginController;