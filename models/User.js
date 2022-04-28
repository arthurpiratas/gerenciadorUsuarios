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

    async create(name, email, password, role){
        try{
            let hash = await bcrypt.hash(password,10)
            await knex.insert({name,email, password: hash, role}).table("users")
        }catch(err){
            console.log(err)
        }
        
    }

    async findEmail(email){
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

}

module.exports = new User()