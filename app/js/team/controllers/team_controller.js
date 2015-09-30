module.exports = function(app){
    app.controller('TeamController', ['$scope', '$http', function($scope, $http){
        $scope.lsugreet = 'This REST API updates a database of LSU Tigers football players. GEAUX TIGERS!!'

        $scope.team = [];

        $scope.getAll = function(){
            $http.get('/api/team')
                .then(function(res){
                    $scope.team = res.data;
                }, function(res){
                    console.log('GET error with ' + res);
                });
        };

        $scope.createTiger = function(tiger){
            $http.post('/api/team', tiger)
                .then(function(res){
                    $scope.team.push(res.data);
                    $scope.newlsutigers = null;
                }, function(res){
                    console.log('POST error with ' + res);
                });
        };

        $scope.updateTiger = function(tiger){
            tiger.status = 'pending';
            $http.put('/api/team/' + tiger._id , tiger)
                .then(function(res){
                    delete tiger.status;
                    tiger.editing = false;
                }, function(res){
                    console.log('PUT error with ' + res);
                    tiger.status = 'failed';
                    tiger.editing = false;
                });
        };

        $scope.removeTiger = function(tiger){
            tiger.status = 'pending';
            $http.delete('/api/team/' + tiger._id)
                .then(function(){
                    $scope.team.splice($scope.team.indexOf(tiger), 1);
                }, function(res){
                    console.log('DELETE error with ' + res);
                    tiger.status = 'failed';
                });
        };
    }]);
};
