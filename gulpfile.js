var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var webpack = require('webpack-stream');

gulp.task('jshint', function(){
    return gulp.src(['lib/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'gulpfile.js', 'index.js', 'server.js'])
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
        .pipe(watch('./app/js/client.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('callback', function(cb){
    watch('./app/js/client.js')
        gulp.src('./app/js/client.js', function(){
            .pipe(watch('./app/js/client.js'))
            .on('end', cb);
        });
});

gulp.task('staticfiles:dev', function(){
    return gulp.src('./app/**/*.html')
        .pipe(watch('./app/**/*.html'))
        .pipe(gulp.dest('build/'));
});

gulp.task('callback', function(cb){
    watch('./app/**.*.html')
       gulp.src('./app/**/*.html')
       .on('end, cb');
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['jshint', 'build:dev']);
