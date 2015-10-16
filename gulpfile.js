var gulp = require('gulp');
var concat = require('gulp-concat');

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

var core_sources = ['core', 'utils/utils', 'ready/ready', 'dom/attr', 'dom/class', 'dom/size', 'dom/scroll', 'dom/offset', 'css/style', 'ajax/aja'].map(function(file) {
  return './source/' + file + '.js';
});

gulp.task('core', function() {
  return gulp.src(core_sources)
    .pipe(concat('j.js', {newLine: '\n'}))
    .pipe(gulp.dest('build'));
});
