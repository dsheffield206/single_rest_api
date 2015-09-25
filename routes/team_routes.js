'use strict';

var lsutigers = require(__dirname + '/../models/team');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var teamRouter = module.exports = exports = express.Router();

teamRouter.get('/', function(req, res){
    lsutigers.find({}, function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});

teamRouter.post('/', jsonParser, function(req, res){
    var newlsutigers = new lsutigers(req.body);
    newlsutigers.save(function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});

teamRouter.put('/:id', jsonParser, function(req, res){
    var newlsutigersBody = req.body;
    delete newlsutigersBody._id;
    lsutigers.update({_id: req.params.id}, newlsutigersBody, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'your update was a success'});
    });
});

teamRouter.delete('/:id', jsonParser, function(req, res){
    lsutigers.remove({_id: req.params.id}, function(err){
        if(err) return handleError(err, res);
        res.json({msg: 'your delete went through'});
    });
});

// NonCRUD Stuff
teamRouter.get('/', function(req, res){
    lsutigers.count({}, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'success counting players!'});
    });
});

teamRouter.get('/', function(req, res){
    lsutigers.sort({}, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'you just sorted the team, yo!'});
    });
});
