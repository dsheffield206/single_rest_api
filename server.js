'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/team_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'geauxlsutigersnumberone';

var teamRouter = require(__dirname + '/routes/team_routes');
app.use('/api/team', teamRouter);

var userRouter = require(__dirname + '/routes/user_routes');
app.use('/api/auth', userRouter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('server is running on port ' + port + ' !');
});
