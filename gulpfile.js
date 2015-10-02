var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var Karma = require('karma').server;
var webpack = require('webpack-stream');
var paths = {
   server: ['lib/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'gulpfile.js', 'index.js', 'server.js'],
   client: ['app/**/*.js', 'app/**/*.html'],
};

gulp.task('jshint', function(){
    return gulp.src(paths.server, paths.client)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('webpack:dev', function(){
    return gulp.src('./app/js/client.js')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function(){
    return gulp.src('./test/client/entry.js')
        .pipe(webpack({
            output: {
                filename: 'test_bundle.js'
            }
        }))
        .pipe(gulp.dest('test/client'));
});

gulp.task('staticfiles:dev', function(){
    return gulp.src(['./app/**/*.html', './app/css/**/*css'])
        .pipe(gulp.dest('build/'));
});

gulp.task('servertests', function(){
    return gulp.src('./test/api_test/**/*test.js')
        .pipe(mocha({reporter: 'nyan'}));
        .once('error', function(err){
            console.log('servertests had this error ' + err);
            process.exit(1);
        })
        .once('end', function(){
            if(this.seq.length === 1 && this.seq[0] === 'servertests')
                process.exit(1);
        }.bind(this));
});

gulp.task('karmatests', ['webpack:test'], function(done){
    new Karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('watch:build', function(){
    gulp.watch(paths.client, ['build:dev']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['jshint', 'build:dev']);
