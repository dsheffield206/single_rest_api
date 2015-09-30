var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var paths = {
   server: ['lib/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'gulpfile.js', 'index.js', 'server.js'],
   client: ['app/**/*.js', 'app/**/*.html'],
};

gulp.task('jshint', function(){
    return gulp.src(paths)
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



gulp.task('staticfiles:dev', function(){
    return gulp.src(['./app/**/*.html', './app/css/**/*css'])
        .pipe(gulp.dest('build/'));
});

gulp.task('watch:build', function(){
    gulp.watch(paths.client, ['build:dev']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['jshint', 'build:dev']);
