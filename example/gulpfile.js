var gulp = require('gulp');
var htmlInsert = require('gulp-html-build').htmlInsert;
var htmlRename = require('gulp-html-build').htmlRename;


gulp.task('insert',function() {
  return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});


gulp.task('default', ['insert'], function() {
  return gulp.src('build/*.html')
    .pipe(htmlRename());
});