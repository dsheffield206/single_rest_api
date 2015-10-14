module.exports = function(teamApp){
    teamApp.config(['$routeProvider', function($route){
        $route
            .when('/notes', {
                templateUrl: '/templates/team/views/team_view.html'
            })
            .when('/signup', {
                templateUrl: '/templates/users/view/users_view.html',
                controller: 'SignupController'
            })
            .when('/signin', {
                templateUrl: '/templates/users/view/users_view.html',
                controller: 'SigninController'
            })
            .otherwise({
                redirectTo: '/signup'
            });
    }]);
};
