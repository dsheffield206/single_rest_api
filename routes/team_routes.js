'use strict';

var lsutigers = require(__dirname + '/../models/team');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var app = module.exports = exports = express.Router();

app.get('/team', function(req, res){
    lsutigers.find({}, function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});

app.post('/team', jsonParser, function(req, res){
    var newlsutigers = new lsutigers(req.body);
    newlsutigers.save(function(err, data){
        if(err) return handleError(err, res);
        res.json(data);
    });
});

app.put('/team/:id', jsonParser, function(req, res){
    var newlsutigersBody = req.body;
    delete newlsutigersBody._id;
    lsutigers.update({_id: req.params.id}, newlsutigersBody, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'your update was a success'});
    });
});

app.delete('/team/:id', jsonParser, function(req, res){
    lsutigers.remove({_id: req.params.id}, function(err){
        if(err) return handleError(err, res);
        res.json({msg: 'your delete went through'});
    });
});

// NonCRUD Stuff
app.get('/team', function(req, res){
    lsutigers.count({}, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'success counting players!'});
    });
});

app.get('/team', function(req, res){
    lsutigers.sort({}, function(err, data){
        if(err) return handleError(err, res);
        res.json({msg: 'you just sorted the team, yo!'});
    });
});
