'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
var mongoose = require('mongoose');
var url = 'localhost:3000/api';

// describe & it yada yada
