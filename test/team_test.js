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
    beforeEach(function(done){
        mongoose.connection.db.remove(function(err){
            if(err) throw err;
            done();
        });
    });

    it('should add something to the collection', function(done){
        mongoose.connection.db.insert({some: 'document'});
        mongoose.connection.db.addSomething({hello: 'world'});
        testDoc = mongoose.connection.db.find({some: 'document'});
            expect(testDoc.hello).to.eql('world');
    });
});
