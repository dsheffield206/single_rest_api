require('angular/angular');
var angular = window.angular;

var teamApp = angular.module('teamApp', []);

require('./services/services')(teamApp);
require('./team/team')(teamApp);

