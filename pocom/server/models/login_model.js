class LoginModel {

    constructor(email, pass) {
        this.email = email
        this.pass = pass
    }

    static async login(data){
        if (data.email === "admin@hotmail.com" && data.pass === "admin123") {
            return { success: true, message: 'Received login request' };
        } else {
            return  { success: false, message: 'Invalid email or password' };
        }
    }

}

module.exports = LoginModel; 