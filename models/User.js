var knex = require("../database/connection")
const bcrypt = require("bcrypt")

class User {

    async findAll(){
        try {
            let result = await knex.select(["id", "name", "email", "role"]).from("users")
            return result 
        }catch(err){
            console.log(err)
            return []
        }
    }

    async findId(id){
        try {
            let result = await knex.select(["id", "name", "email", "role"]).where({id: id}).from("users")
            
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
            
            
        }catch(err){
            console.log(err)
            return undefined
        }
    }

    async findByEmail(email){
        try {
            let result = await knex.select(["id", "name","password", "email", "role"]).where({email: email}).from("users")
            
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
            
            
        }catch(err){
            console.log(err)
            return undefined
        }
    }

    async create(name, email, password, role){
        try{
            let hash = await bcrypt.hash(password,10)
            await knex.insert({name,email, password: hash, role}).table("users")
        }catch(err){
            console.log(err)
        }
        
    }

    async findEmailExist(email){
        try{
            var result = await knex.select("*").from("users").where({email: email})
            
            if(result.length > 0){
                return true
            }else{
                return false
            }

        }catch(err){
            console.log(err)
        }
    }

    async update(id, email, name, role){

        let user = await this.findId(id)

        if(user != undefined){
            var edituser = {}; 

            if(email != undefined){
                if(email != user.email){
                    let result = await this.findEmailExist(email)
                    if(!result){
                        edituser.email = email
                    }else {
                        return {status: false, err: "O email j?? foi cadastrado!"}
                    }
                }
            }

            if(name != undefined){
                edituser.name = name
            }

            if(role != undefined){
                edituser.role = role
            }

            try{
                await knex.update(edituser).where({id: id}).from("users")
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }

        }else{
            return {status: false, err: "O usu??rio n??o existe!"}
        }
    }

    async delete(id){

        let user = await this.findId(id)

        if(user != undefined){
            try{
                await knex.delete().where({id: id}).from("users")
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }
            
        }else{
            return {status: false, err: "O usu??rio n??o existe!"}
        }
    }

    async changePassword(newPassword, id, token){
        let hash = await bcrypt.hash(newPassword,10)
        try{
            await knex.update({password: hash}).where({id:id}).from("users")
            return true
        }catch(err){
            return false
        }
        

    }

}

module.exports = new User()