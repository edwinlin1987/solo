var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  score: function() {
    return this.hasMany(Score);
  },
// code borrowed from Hack Reactor
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    // return a promise - bookshelf will wait for the promise
    // to resolve before completing the create action
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
// end code borrowed from Hack Reactor
});

module.exports = User;
