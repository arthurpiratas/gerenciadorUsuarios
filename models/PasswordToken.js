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
}

module.exports = new PasswordToken()