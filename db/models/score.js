var db = require('../config');

var Score = db.Model.extend({
  tableName: 'scores',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'username');
  },
});

module.exports = Score;
