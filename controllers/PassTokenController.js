var PasswordToken = require('../models/PasswordToken')

class PassTokenController {
    
    async recoverPassword(req, res){
        let email = req.body.email

        let result = await PasswordToken.create(email)
        
        if(result.status){
            res.status(200)
            res.send(""+result.token)

        }else{
            res.status(404)
            res.send(result.err)
        }
    }

}

module.exports = new PassTokenController()