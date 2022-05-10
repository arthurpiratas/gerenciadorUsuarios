var PasswordToken = require('../models/PasswordToken')
var User = require("../models/User")

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

    async changePassword(req, res){
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status){
            try{
                let sucess = await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
                if(sucess){
                    await PasswordToken.setUsed(isTokenValid.token)
                }
                res.status(200)
                res.send("Senha alterada com sucesso!")
            }catch(err){
                res.status(404)
                res.send("Erro na alteração da senha!")
            }
            
        }else{
            res.status(406)
            res.send("token inválido!")
        }
    }

}

module.exports = new PassTokenController()