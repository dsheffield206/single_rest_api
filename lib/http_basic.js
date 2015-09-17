module.exports = exports = function(req, res, next){
    var userPwordEncode = (req.headers.authorization || ' :').split(' ')[1];
    var userPwordBufr = new Buffer(userPwordEncode, 'base64');
    var userPwordSplit = userPwordBufr.toString('utf8').split(':');
    req.auth = {
        username: userPwordSplit[0],
        password: userPwordSplit[1]
    };
    if(!(req.auth.username.length && req.auth.password)){
        console.log('could not authenticate ' + req.auth.username);
        return res.status(401).send(msg: 'could not authenticate user');
    }

    next();
};
