基于gulp的HTML模块化开发方式


[示例](https://github.com/catezhao1985/gulp-html-build.git)

gulp中的主要代码如下：
//引入库
var htmlInsert = require('gulp-html-build').htmlInsert,
    generateView = require('gulp-html-build').generateView;

//通过模板生成html页面
gulp.task('default',['pubilc'], function() {
  return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});

// 模板中可以套用模板
gulp.task('pubilc', function() {
  return gulp.src('src/views/*.html')
    .pipe(generateView({dest:"src/public/"}))    
    .pipe(gulp.dest('src/public'));
});



html模板
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="foot">
    	// 模板来自于public下的文件
    	<!--{{foot_toefl.html}}-->
    </div>
</body>
</html>
