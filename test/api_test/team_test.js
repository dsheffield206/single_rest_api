'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
require(__dirname + '/../../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var lsutigers = require(__dirname + '/../../models/team');

describe('the team resource', function(){
    after(function(done){
        mongoose.connection.db.dropDatabase(function(err){
            if(err) throw err;
            done();
        });
    });

    it('should get players from team', function(done){
        chai.request(url)
            .get('/team')
            .end(function(err, res){
                expect(err).to.eql(null);
                done();
            });
    });

    it('should create a new player in team', function(done){
        chai.request(url)
            .post('/team')
            .send({teamBody: 'testing tiger'})
            .end(function(err, res){
                expect(err).to.eql(null);
                expect(res.body.teamBody).to.eql('testing tiger');
                done();
            });
    });

    describe('routes that need a player in the database', function(){
        beforeEach(function(done){
            var testTiger = new lsutigers({teamBody: 'testingTiger'});
            testTiger.save(function(err, data){
                if(err) throw err;
                this.testTiger = data;
                done();
            }.bind(this));
        });

        it('should update a lsu tiger in team', function(done){
            chai.request(url)
                .put('/team/' + this.testTiger._id)
                .send({teamBody: 'new testingTiger'})
                .end(function(err, res){
                    expect(err).to.eql(null);
                    expect(res.body.msg).to.eql('your update was a success');
                    done();
                });
        });
    });
});
