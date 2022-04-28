var knex = require("../database/connection")
const bcrypt = require("bcrypt")

class User {

    async create(name, email, password, role){
        try{
            await knex.insert({name,email, password, role}).table("users")
        }catch(err){
            console.log(err)
        }
        
    }

}

module.exports = new User()