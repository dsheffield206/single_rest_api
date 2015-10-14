var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var user;

module.exports = exports = function(req, res, next){
    var encryptToken = req.headers.token || (req.body? req.body.token : undefined);
    if(!encryptToken)
        return res.status(401).json({msg: 'could not authenticate'});
    ee.emit('decode', encryptToken, req, res, next);
};

ee.on('decode', function(encryptToken, req, res, next){
    eat.decode(encryptToken, process.env.APP_SECRET, function(err, token){
        if(err) return handleError(err, res);
    ee.emit('findOne', encryptToken, req, res, next);
    });
});


ee.on('findOne', function(encryptToken, req, res, next, token){
    User.findOne({_id: token.id}, function(err, user){
        if(err) return handleError(err, res);
        if(!user) return res.status(401).json({msg: 'could not authenticate'});
        req.user = user;
        next();
    });
});

