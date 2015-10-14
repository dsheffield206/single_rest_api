var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/..lib/eat_auth');
var handleError = require(__dirname + '/../lib/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var user;

var userRouter = module.exports = exports = express.Router();

userRouter.get('/', function(req, res, next){
    if(!req.auth.username){
      redirect: '/signin';
    }
});

userRouter.get('/signin', httpBasic, function(req, res){
    ee.emit('findOne', user, req, res);
});

ee.on('findOne', function(user, req, res){
    User.findOne({'basic.username': req.auth.username}, function(err, user){
        if(err) return handleError(err, res);
        if(!user){
            console.log('could not authenticate ' + req.auth.username);
            return res.status(401).json({success: false, msg: 'could not authenticate'});
        }
        ee.emit('compareHashAgain', user, req, res);
    });
});

ee.on('compareHashAgain', function(user, req, res){
    user.compareHash(req.auth.password, function(err, hashRes){
        if(err) return handleError(err, res);
        if(!hashRes){
            console.log('could not authenticate ' + req.auth.username);
            return res.status(401).json({success: false, msg: 'could not authenticate'});
        }
        ee.emit('generateToken', user, req, res);
    });
});

ee.on('generateToken', function(user, req, res){
    user.generateToken(function(err, token){
        if(err) return handleError(err, res);
        res.json({success: true, token: token});
    });
});

userRouter.post('/signup', jsonParser, function(req, res){
    var newUser = new User();
    newUser.basic.username = req.body.username;
    newUser.username = req.body.username;
    ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res){
    newUser.generateHash(req.body.password, function(err, hash){
        if(err) return handleError(err, data);
        ee.emit('save', newUser, req, res);
    });
});

ee.on('save', function(newUser, req, res){
    newUser.save(function(err, data){
        if(err) return handleError(err, data);
        ee.emit('newUser', newUser, req, res);
    });
});

ee.on('newUser', function(newUser, req, res){
    newUser.generateToken(function(err, token){
        if(err) return handleError(err, res);
        res.json({success: true, token: token});
    });
});

userRouter.get('/username', jsonParser, eatAuth, function(req, res){
    res.json({username: req.user.username});
});
