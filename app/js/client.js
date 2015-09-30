require('angular/angular');

var teamApp = angular.module('teamApp', []);

teamApp.controller('teamController', ['$scope', function($scope){
    $scope.lsugreet = 'This REST API updates a database of LSU Tigers football players.';
}]);
