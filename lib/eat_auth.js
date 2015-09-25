var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');

module.exports = exports = function(req, res, next){
    var encryptToken = req.headers.token || (req.body? req.body.token : undefined);
    if(!encryptToken)
        return res.status(401).json({msg: 'could not authenticate'});
    eat.decode(encryptToken, process.env.APP_SECRET, function(err, token){
        if(err) return handleError(err, res);

        User.findOne({_id: token.id}, function(err, user){
            if(err) return handleError(err, res);
            if(!user) return res.status(401).json({msg: 'could not authenticate'});
            req.user = user;
            next();
        });
    });
};
