module.exports = function(app){
    app.controller('SignupController', ['$scope', '$http', '$base64', '$location', '$cookies', function($scope, $http, $base64, $location, $cookies){
        $scope.buttonText = 'SignIn to Your Account';
        $scope.user = {};
        $scope.switchText = 'or Create Your Account';

        $scope.pageSwap = function(){
            return $location.path('/signup');
        };

        $scope.userVerify = function(user){
            $http({
                method: 'GET',
                url: '/api/signin',
                headers: {
                    'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
                }
            })
                .then(function(res){
                    console.log(res);
                    $location.path();
                    $cookies.set('eat', res);
                }, function(res){
                    console.log(res);
                });
        };
    }]);
};
