var gulp = require('gulp');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');

var tasks = ['ajax', 'css', 'data', 'dom', 'effect', 'event', 'ready', 'selector', 'utils'];

var base = 'source';

var source_css = ['/css/style.js', '/css/css.js'].map(function(path) {
  return base + path;
});

gulp.task('build', function() {});

gulp.task('build-css', function() {

  gulp.src(source_css)
    .pipe(concat('css.js', {newLine: '\n'}))
    .pipe(gulp.dest('build/css'));

});

gulp.task('build-in-one', function() {});

gulp.task('build-doc', function() {});

gulp.task('dev', function() {});
