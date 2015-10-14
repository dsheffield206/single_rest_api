require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var teamApp = angular.module('teamApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(teamApp);
require('./team/team')(teamApp);
require('./users/users')(teamApp);
require('./logout')(teamApp);
require('./router')(teamApp);

