
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .raw("INSERT INTO user (username, password, email, rol) VALUES ('admin', encrypt('1234'), 'jomisoac@gmail.com', 'SUPER_ADM')  ;")
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    
  ])
};

exports.config = {
  transaction: false
};
