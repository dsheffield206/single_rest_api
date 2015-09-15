'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Player = require(__dirname + '/../models/team');

describe('the team resource', function(){
    after(function(done){
        mongoose.connection.db.dropDatabase(function(err){
            if(err) throw err;
            done();
        });
    });

    it('should be able to count collection', function(done){
        chai.request(url)
            .count('collection')

    });
});
