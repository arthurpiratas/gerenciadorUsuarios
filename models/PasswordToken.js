var knex = require("../database/connection")
const bcrypt = require("bcrypt")
var User = require("./User")

class PasswordToken{
    async create(email){
        let result = await User.findByEmail(email)

        if(result != undefined){

            let token = Date.now() + (result.id * 5 - 1)

            try{
                await knex.insert({
                    user_id: result.id,
                    used: 0,
                    token: token
                }).from("passwordtokens")
                return {status: true, token: token}

            }catch(err){
                console.log(err)
                return {status: false, err: err}
            }
            

        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados!"}
        }
    }

    async validate(token){

        try{
            let result = await knex.select().where({token:token}).table("passwordtokens")

            if(result.length > 0){
                var tk = result[0]

                if(tk.used){
                    return {status: false}
                }else{
                    return {status: true, token: tk}
                }

            }else{
                return {status: false}
            }

        }catch(err){
            console.log(err)
            return {status: false}
        }
        
    }

    async setUsed(token){
        await knex.update({used: 1}).where({id: token.id}).from("passwordtokens")
    }

}

module.exports = new PasswordToken()