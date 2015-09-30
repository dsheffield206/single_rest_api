require('angular/angular');

var teamApp = angular.module('teamApp', []);

teamApp.controller('teamController', ['$scope', function($scope){
    $scope.helloworld = 'Hello, World! This App uses a REST API to update a database of football players from the LSU Tigers.';
}]);
