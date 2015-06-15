
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'jsracing',
    charset: 'utf8',
  }
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('scores').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('scores', function (score) {
      score.increments('id').primary();
      score.integer('wpm', 5);
      score.string('function', 10);
      score.integer('chars', 10);
      score.integer('mistakes', 10);
      score.integer('time', 100);
      score.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
