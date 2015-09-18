var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var user;

var app = module.exports = exports = express.Router();

app.get('/', function(req, res, next){
    if(!req.auth.username){
      redirect: '/signin'
    }
});

app.get('/signin', httpBasic, function(req, res){
    ee.emit('findOne', req, res, user);
});

ee.on('findOne', function(req, res, user){
    User.findOne({'basic.username': req.auth.username}, function(err, user){
        if(err) return handleError(err, res);
        if(!user){
            console.log('could not authenticate ' + req.auth.username);
            return res.status(401).json({success: false, msg: 'could not authenticate'});
        }
        ee.emit('compareHash', req, res, user);
    });
});

ee.on('compareHash', function(req, res, user){
    User.compareHash(req.auth.password, function(err, hashRes){
        if(err) return handleError(err, res);
        if(!hashRes){
            console.log('could not authenticate ' + req.auth.username);
            return res.status(401).json({success: false, msg: 'could not authenticate'});
        }
        ee.emit('generateToken', req, res, user);
    });
});

ee.on('generateToken', function(req, res, user){
    User.generateToken(function(err, token){
        if(err) return handleError(err, res);
        res.json({success: true, token: token});
    });
});

app.post('/signup', jsonParser, function(req, res){
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
        ee.emit('generateToken', newUser, req, res);
    });
});

ee.on('generateNewToken', function(newUser, req, res){
    newUser.generateToken(function(err, token){
        if(err) return handleError(err, res);
        res.json({success: true, token: token});
    });
});
