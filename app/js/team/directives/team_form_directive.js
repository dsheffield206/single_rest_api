module.exports = function(app){
    app.directive('teamForm', function(){
        return{
            restrict: 'AC',
            replace: true,
            templateUrl: '/templates/team/directives/team_form_template.html',
            scope: {
                labelText: '@',
                buttonText: '@',
                tiger: '=',
                save: '&'
            },
            controller: function($scope){
                console.log($scope.save);
            }
        }
    });
};
