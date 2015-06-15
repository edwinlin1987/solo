var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Scores = require('./db/collections/scores');
var Score = require('./db/models/score');

var app = express();
app.use(morgan('dev'));
app.use(session({
  secret: 'obvious_secret',
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));


passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy( function(username, password, done) {
  new User({username: username}).fetch().then(function(found){
      if(found) {
        if (found.get('password') === password){
          return done(null, found);
        } else {
          return done(null, false, {message: 'incorrect password'});
        }
      } else {
        return done(null, false, {message: 'incorrect username'});
      }
    });
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/scores', function (req, res) {
  data = req.body.data;
  var score = new Score({
    'wpm': req.body.wpm,
    'function': data.function,
    'chars': data.chars,
    'mistakes' : data.mistakes,
    'time': req.body.time
  }).save().then(function(newScore) {
    Scores.add(newScore);
    res.send(200, newScore);
  });
});

app.get('/scores', function (req, res) {
  Scores.reset().fetch().then(function(scores) {
    res.send(200, scores.models);
  });
});



app.listen(4568);
console.log('listening on 4568');
