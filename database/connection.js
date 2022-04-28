const variable = require('../bin/configuration/variables.js')

var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : variable.Database.user,
      password : variable.Database.pass,
      database : 'apiusers'
    }
  });

module.exports = knex