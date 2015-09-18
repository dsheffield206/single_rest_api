var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handle_error');

var app = module.exports = exports = express.Router();

app.get('/', function(req, res, next){
    if(!req.auth.username){
      redirect: '/signin'
    }
});

app.get('/signin', httpBasic, function(req, res){
    User.findOne({'basic.username': req.auth.username}, function(err, user){
        if(err) return handleError(err, res);
        if(!User){
            console.log('could not authenticate ' + req.auth.username);
            return res.status(401).json({success: false, msg: 'could not authenticate'});
        }

        User.compareHash(req.auth.password, function(err, hashRes){
            if(err) return handleError(err, res);
            if(!hashRes){
                console.log('could not authenticate ' + req.auth.username);
                return res.status(401).json({success: false, msg: 'could not authenticate'});
            }

            User.generateToken(function(err, token){
                if(err) return handleError(err, res);
                res.json({success: true, token: token});
            });
        });
    });
});

app.post('/signup', jsonParser, function(req, res){
    var newUser = new User();
    newUser.basic.username = req.body.username;
    newUser.username = req.body.username;
    newUser.generateHash(req.body.password, function(err, hash){
        if(err) return handleError(err, data);
        newUser.save(function(err, data){
            if(err) return handleError(err, data);
            newUser.generateToken(function(err, token){
                if(err) return handleError(err, res);
                res.json({success: true, token: token});
            });
        });
    });
});
