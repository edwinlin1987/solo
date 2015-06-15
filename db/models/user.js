var db = require('../config');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  score: function() {
    return this.hasMany(Score);
  },
});

module.exports = User;
