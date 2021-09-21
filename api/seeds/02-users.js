const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  
      return knex('users').insert([
        { username: 'Rodgers', password: bcrypt.hashSync('password', 8), name: 'Rodgers Otieno', email:'Rodgers@test.com' },
        { username: 'Huimin', password: bcrypt.hashSync('password', 8), name: 'Huimin Zhang', email:'Huimin@test.com' },
        { username: 'Nathan', password: bcrypt.hashSync('password', 8), name: 'Nathan Cheney', email:'scooby@test.com' }
      ]);
};