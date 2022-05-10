var jwt = require("jsonwebtoken")
const variable = require('../bin/configuration/variables.js')

const secret = variable.Autentication.secret

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ')

        let token = bearer[1]

        try{
            var decoded = jwt.verify(token, secret)

            if(decoded.role == 1){
                console.log(decoded)
                next()
            }else{
                res.status(403)
                res.send("Você não está autorizado!")
                return
            }

            
        }catch(err){
            res.status(403)
            res.send("Você não está autenticado!")
            return
        }
        

    }else{
        res.status(403)
        res.send("Você não está autenticado!")
        return 
    }
}