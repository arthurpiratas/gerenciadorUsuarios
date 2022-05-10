var User = require("../models/User")
var jwt = require("jsonwebtoken")
const variable = require('../bin/configuration/variables.js')
const bcrypt = require("bcrypt")

const secret = variable.Autentication.secret

class UserController{
    async index(req, res){}

    async listAll(req, res){
        try{
            let users = await User.findAll()
            res.status(200)
            res.json(users)
        }catch(err){
            res.status(400)
            res.send("Erro na busca de usuários!")
        }
        
    }

    async listForId(req, res){

        let id =  req.params.id

        
        if(!isNaN(id)){
            try{
                let user = await User.findId(id)
                if(user == undefined){
                    res.status(404)
                    res.send("Usuário não encontrado")
                }else{
                    res.status(200)
                    res.json(user)
                }
            }catch(err){
                res.status(400)
                res.send("Erro na busca do ID")
            }
        }else{
            res.status(400)
            res.send("ID inválido")
        }

        
        
    }

    async create(req,res){
        let {name, email, password, role} = req.body
        let erros = [] 
            
        if(name == undefined || name == null || name == ""){
            erros.push({err: "O nome é inválido"})
        }
        if(email == undefined || email == null || email == ""){
            erros.push({err: "O e-mail é inválido"})
        }
        if(await User.findEmail(email)){
            erros.push({err: "O e-mail já foi cadastrado"})
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

    async edit(req, res){
        var {id, name, role, email} = req.body

        var result = await User.update(id, email, name, role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send("ok")
            }else{
                res.status(406)
                res.send(result.err)
            }
        }else{
            res.status(404)
            res.send(result.err)
        }
    }

    async delete(req, res){
        var id = req.params.id

        var result = await User.delete(id)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send("ok")
            }else{
                res.status(406)
                res.send(result.err)
            }
        }else{
            res.status(404)
            res.send(result.err)
        }
    }

    async login(req, res){
        var {email, password} = req.body

        var user = await User.findByEmail(email)

        if(user != undefined){
            if(user.email == email){
                var result = await bcrypt.compare(password, user.password)
                if(result){
                    let token = jwt.sign({ email: user.email, role: user.role }, secret);
                    res.status(200)
                    res.json({token: token})
                }else{
                    res.status(404)
                    res.json({status: false, messsage: "Crendenciais inválidas!"}) 
                }
            }else{
                res.status(404)
                res.json({status: false, messsage: "Crendenciais inválidas!"})
            }   
        }else{
            res.status(404)
            res.json({status: false, messsage: "Crendenciais inválidas!"})
            
        }
    }
}

module.exports = new UserController()