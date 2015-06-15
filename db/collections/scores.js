var db = require('../config');
var Score = require('../models/score');

var Scores = new db.Collection();

Scores.model = Score;

module.exports = Scores;
