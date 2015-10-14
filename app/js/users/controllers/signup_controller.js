module.exports = function(app){
    app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
        $scope.buttonText = 'Create a New User';
        $scope.confirmPassword = true;
        $scope.user = {};
        $scope.switchText = 'or SignIn as an Returning User';
        console.log($location.path());

        $scope.matchPassword = function(user){
            return user.password === user.confirmation;
        };

        $scope.disableButton = function(user){
            return ($scope.userForm.$invalid && !$scope.matchPassword(user));
        };

        $scope.pageSwap = function(){
            return $location.path('/signin');
        };

        $scope.userVerify = function(user){
            $http.post('/api/signup', user)
                .then(function(res){
                    $cookies.put('eat', res.data.token);
                    $scope.getUserName();
                    $location.path('/team');
                }, function(res){
                   console.log(res);
                });
        };
    }]);
};
