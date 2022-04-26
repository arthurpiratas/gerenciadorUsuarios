const variable = '../bin/configuration/variables.js'

var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : variables.Database.user,
      password : variables.Database.pass,
      database : 'apiusers'
    }
  });

module.exports = knex