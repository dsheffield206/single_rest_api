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

describe('user auth', function(){
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            done();
        });
    });

    it('should create a new user', function(done){
        chai.request('localhost:3000/api')
            .post('/signup')
            .send({username: 'test', password: 'football123'})
            .end(function(err, res){
                expect(err).to.eql(null);
                expect(res.body.token).to.have.length.above(0);
                done();
            });
    });

    describe('user already exists in database', function(){
        before(function(done){
            var user = new User();
            user.username = 'test';
            user.basic.username = 'test';
            user.generateHash('football123', function(err, res){
                if(err) throw err;
                user.save(function(err, data){
                    if(err) throw err;
                    user.generateToken(function(err, token){
                        if(err) throw err;
                        this.token = token;
                        done();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        });

        it('should be able to signin existing user', function(done){
            chai.request('localhost:3000/api')
                .get('/signin')
                .auth('test', 'football123')
                .end(function(err, res){
                    expect(err).to.eql(null);
                    expect(res.body.token).to.have.length.above(0);
                    done();
                });
        });

        it('should authentice users with eat', function(done){
            var token = this.token;
            var req = {
                headers: {
                    token: token
                }
            };

            eatAuth(req, {}, function(){
                expect(req.user.username).to.eql('test');
                expect(res.body.token).to.have.length.above(0);
                done();
            });
        });
    });
});
