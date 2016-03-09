var gulp = require('gulp');
var htmlInsert = require('gulp-html-build').htmlInsert;


gulp.task('default',function() {
  return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});