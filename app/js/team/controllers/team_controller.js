module.exports = function(app){
    app.controller('TeamController', ['$scope', '$http', function($scope, $http){
        $scope.lsugreet = 'This REST API updates a database of LSU Tigers football players. Update or create your favorite LSU player! GEAUX TIGERS!!'

        $scope.team = [];
        $scope.newPlayer = {};

        $scope.getAll = function(){
            $http.get('/api/team')
                .then(function(res){
                    $scope.team = res.data;
                }, function(res){
                    console.log('GET error with ' + res);
                });
        };

        $scope.create = function(tiger){
            $http.post('/api/team', tiger)
                .then(function(res){
                    $scope.tiger = '';
                    $scope.getAll();
                    $scope.newPlayer = null;
                }, function(res){
                    console.log('POST error with ' + res);
                });
        };

        $scope.update = function(tiger){
            $http.put('/api/team/' + tiger._id , tiger)
                .then(function(res){
                    $scope.getAll();
                    tiger.editing = false;
                }, function(res){
                    console.log('PUT error with ' + res);
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

        $scope.remove = function(tig_id){
            $http.delete('/api/team/' + tig_id)
                .then(function(res){
                    $scope.team.splice($scope.team.indexOf(tig_id), 1);
                }, function(res){
                    console.log('DELETE error with ' + res);
                });
        };
    }]);
};
