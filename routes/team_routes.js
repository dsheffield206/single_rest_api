'use strict';

var Player = require(__dirname + '/../models/team');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var teamRoute = module.exports = exports = express.Router();

teamRoute.get('/team', function(req, res){
    Player.find({}, function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});

teamRoute.post('/team', jsonParser, function(req, res){
    var newPlayer = new Player(req.body);
    newPlayer.save(function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});


// NonCRUD Stuff
teamRoute.db.collection.count();
teamRoute.db.collection.sort();
