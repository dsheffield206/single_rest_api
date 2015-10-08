module.exports = function(app){
    app.controller('TeamController', ['$scope', 'Resource', function($scope, Resource){
        $scope.lsugreet = 'This REST API updates a database of LSU Tigers football players. Update or create your favorite LSU player! GEAUX TIGERS!!'
        $scope.team = [];
        $scope.newPlayer = {};
        var teamResource = Resource('team');

        $scope.getAll = function(){
            teamResource.getAll(function(err, data){
                if (err) return console.log('getAll error with ' + err);
                $scope.team = data;
            });
        };

        $scope.create = function(tiger){
            teamResource.create(tiger, function(err, data){
                if (err) return console.log('create error with ' + res);
                $scope.newPlayer = {};
                $scope.team.push(data);
            });
        };

        $scope.update = function(tiger){
            teamResource.update(tiger, function(err){
                if (err) return console.log('update error with ' + res);
                tiger.editing = false;
            });
        };

        $scope.edit = function(tiger){
            tiger.editing = true;
            tiger.oldName = tiger.name;
            tiger.oldPosition = tiger.position;
            tiger.oldHighSchool = tiger.high_school
        };

        $scope.cancel = function(tiger){
            tiger.editing = false;
            tiger.name = tiger.oldName;
            tiger.position = tiger.oldPosition;
            tiger.high_school = tiger.oldHighSchool;
        };

        $scope.remove = function(tiger){
            teamResource.remove(tiger, function(err){
                if (err) return console.log('remove error with ' + res);
                $scope.team.splice($scope.team.indexOf(tiger), 1);
            });
        };
    }]);
};
