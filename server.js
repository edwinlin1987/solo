var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var port = process.env.port || 8081;
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

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch().then(function(user) {
    if(!user) {
      res.redirect('/signin');
    } else if (password === user.get('password')) {
      req.session.regenerate(function(){
        req.session.user = user;
        res.send(201, user);
      });
    } else {
      res.redirect('/signin');
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
        Users.add(newUser);
        req.session.regenerate(function(){
          req.session.user = newUser;
          res.send(201, newUser);
        });
      });
    } else {
      res.redirect('/signup');
    }
  });
});

app.post('/scores', function (req, res) {
  new User({ username : req.body.username }).fetch()
  .then(function(user) {
    console.log(user);
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
    Scores.add(newScore);
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
