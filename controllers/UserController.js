var User = require("../models/User")

class UserController{
    async index(req, res){}

    async create(req,res){
        let {name, email, password, role} = req.body
        let erros = [] 
            
        if(name == undefined || name == null || name == ""){
            erros.push({err: "O nome é inválido"})
        }
        if(email == undefined || email == null || email == ""){
            erros.push({err: "O e-mail é inválido"})
        }
        if(password == undefined || password == null || password == ""){
            erros.push({err: "O password é inválido"})
        }
        if(role == undefined || role == null || isNaN(role)){
            erros.push({err: "O cargo é inválido"})
        }
            
        if(erros.length){
            res.status(400)
            res.send(erros)
        }else{

            try{
                await User.create(name, email, password, role)
            }catch(err){
                console.log(err)
            }

            
            res.status(200)
            res.send("OK")
        }
    }
}

module.exports = new UserController()