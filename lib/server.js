'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/team_dev');

var teamRouter = require(__dirname + '/../routes/team_routes');
app.use('/api', teamRouter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('server is running on port ' + port + ' !');
});
