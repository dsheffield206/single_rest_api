var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var User = require(__dirname + '/../models/user');

describe('httpBasic', function(){
    it('should parse basic http auth', function(){
        var req = {
            headers: {
                authorization: 'Basic ' + (new Buffer('test:football123')).toString('base64')
            }
        };

        httpBasic(req, {}, function(){
            expect(typeof req.auth).to.eql('object');
            expect(req.auth.username).to.eql('test');
            expect(req.auth.password).to.eql('football123');
        });
    });
});
