require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('team controller', function(){
    var $httpBackend;
    var $ControllerConstructor;
    var $scope;

    beforeEach(angular.mock.module('teamApp'));
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        $scope = $rootScope.$new();
        $ControllerConstructor = $controller;
    }));

    it('should be able to create a controller', function(){
        var controller = new $ControllerConstructor('TeamController', {$scope: $scope});
        expect(typeof $scope).toBe('object');
        expect(typeof controller).toBe('object');
        expect(Array.isArray($scope.team)).toBe(true);
    });

    describe('REST requests', function(){
        beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
           $httpBackend = _$httpBackend_;
           $scope = $rootScope.$new();
           $ControllerConstructor('TeamController', {$scope: $scope});
        }));

        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should make a GET request when getAll() is called', function(){
            // var player = {teamBody: 'test tiger', _id: 1, editing: true};

            $httpBackend.expectGET('/api/team/')
                .respond([{teamBody: 'test tiger'},{teamBody: 'test stars'}]);
            $scope.getAll();
            $httpBackend.flush();
            expect($scope.team[0].teamBody).toBe('test tiger');
        });

        it('should be able to create a new LSU player', function(){
            $httpBackend.expectPOST('/api/team/', {teamBody: 'send test tiger'})
                .respond(200, {_id: 1, teamBody: 'test tiger'});
            $scope.newPlayer ={teamBody: 'send test tiger'};
            $scope.create($scope.newPlayer);
            $httpBackend.flush();
            expect($scope.team[0].teamBody).toBe('test tiger');
            expect($scope.newPlayer).toBe(null);
        });

        it('should be able to update a player', function(){
            var player = {teamBody: 'test tiger', _id: 1, editing: true};
            $httpBackend.expectPUT('/api/team/1', player).respond(200);
            $scope.update(player);
            $httpBackend.flush();
            expect(player.editing).toBe(false);
        });

        it('should be able to delete a player', function(){
            var player = {teamBody: 'test tiger', _id: 1};
            $scope.team = [player];
            $httpBackend.expectDELETE('/api/team/1').respond(200);
            $scope.remove(player);
            $httpBackend.flush();
            expect($scope.team.length).toBe(0);
            expect($scope.team.indexOf(player)).toBe(-1);
        });
    });
});
