module.exports = function(app){
    require('./controllers/team_controller')(app);
    require('./directives/team_form_directive')(app);
};
