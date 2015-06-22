var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8081;
var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Scores = require('./db/collections/scores');
var Score = require('./db/models/score');
var bcrypt = require('bcrypt-nodejs');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch().then(function(user) {
    if(!user) {
      res.redirect('/signin');
    } else {
      user.comparePassword(password, function(match){
        if(match) {
          res.send(201, user);
        } else {
          res.redirect('/signin');
        }
      });
    }
  });
});

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch().then(function(found) {
    if(!found) {
      var user = new User({
        'username': username,
        'password': password,
        'chars': 0,
        'mistakes': 0,
        'time':0
      }).save().then(function(newUser) {
        // req.session.regenerate(function(){
          // req.session.user = newUser;
        res.send(201, newUser);
        // });
      });
    } else {
      res.redirect('/signup');
    }
  });
});

app.post('/scores', function (req, res) {
  new User({ username : req.body.username }).fetch()
  .then(function(user) {
    if (user) {
      user.set({
        'chars': user.get('chars') + req.body.chars,
        'mistakes': user.get('mistakes') + req.body.mistakes,
        'time': user.get('time') + req.body.time
      }).save();
    }
  });

  new Score({
    'username': req.body.username,
    'wpm': req.body.wpm,
    'function': req.body.function,
    'chars': req.body.chars,
    'mistakes' : req.body.mistakes,
    'time': req.body.time
  }).save().then(function(newScore) {
    res.send(201, newScore);
  });
});

app.get('/scores', function (req, res) {
  Scores.reset().fetch().then(function(scores) {
    res.send(200, scores.models);
  });
});

app.listen(port);
console.log('listening on ' + port);
