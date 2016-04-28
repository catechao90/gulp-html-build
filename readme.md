#实现基于gulp的HTML`模块化`开发方式


###[示例](https://github.com/catezhao1985/gulp-html-build.git "悬停显示")  https://github.com/catezhao1985/gulp-html-build.git


###gulp中的主要代码如下：


###引入库  

```javascript
var htmlInsert = require('gulp-html-build').htmlInsert;  
```

###通过模板生成html页面 

```javascript 
gulp.task('default', function() {
  return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});
```

###src/index_ielts.html

```javascript 
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
    	<!--{{foot.html}}-->
    </div>
</body>
</html>
```

###src/public/foot.html

```javascript 
<div class="foot-area">
    <div class="foot-banner">
        <a href="#"><img src="images/foot-ad.jpg" atl="" title="" /></a>
    </div>
    <div class="foot-border-bottom-line">        
        <div class="foot-a-cont">
            <div class="foot-links-title">友情链接</div>
            <div class="clearfix">
                <div class="set-links-cont-width <!--{{toefl=active}}--> <!--{{ielts=aaa}}--> <!--{{toefl=ccc ddd}}-->"><a href="#" >雅思考试</a></div>
                <div class="set-links-cont-width <!--{{ielts=active}}-->"><a href="#" >托福培训</a></div>
                <div class="set-links-cont-width <!--{{toefl=test.html}}-->"><a href="#" >牛校网</a></div>
            </div>
        </div>
    </div>
</div>
```
