require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('team controller', function(){
    var $httpBackend;
    var $ControllerConstructor;
    var $scope;

    beforeEach(angular.mock.module('teamApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        $scope = $rootScope.new();
        $ControllerConstructor = $controller;
    }));

    it('should be able to create a controller', function(){
        var controller = new $ControllerConstructor('TeamController', {$scope: $scope});
        expect(typeof $scope).toBe('object');
        expect(typeof controller).toBe('object');
        expect(Array.isArray($scope.tiger)).toBe(true);
    });

    describe('REST requests', function(){
        beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
           $httpBackend = _$httpBackend_;
           $scope = $rootScope.new();
           $ControllerConstructor('TeamController', {$scope: $scope});
        }));

        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should make a GET request when getAll() is called', function(){
            $httpBackend.expectGET('/api/team').respond(200, {teamBody: 'test tiger'});
            $scope.getAll();
            $httpBackend.flush();
            expect($scope.team[0].teamBody).toBe('test tiger');
        });

        it('should be able to create a new LSU player', function(){
            $httpBackend.expectPOST('/api/team', {teamBody: 'send test tiger'}).respond(200, {_id: 1, teamBody: 'test tiger'});
            $scope.newPlayer = {teamBody: 'GeauxTiger'};
            $scope.create({teamBody: 'send test tiger'});
            $httpBackend.flush();
            expect($scope.team[0].teamBody).toBe('test tiger');
            expect($scope.newPlayer).toBe(null);
        });
    });
});
