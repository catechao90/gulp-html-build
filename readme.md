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
    	<!--{{foot_toefl.html}}-->
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
        <div class="seo-description">【小站托福官网】TOEFL<a href="#">托福</a>考试为您提供最新托福备考资料，托福机经预测，托福听力、口语、阅读、写作、词汇真题下载，更有toefl模拟考试、托福报名、托福培训等特色服务。</div>
        <div class="foot-a-cont">
            <div class="foot-links-title">友情链接</div>
            <div class="clearfix">
                <div class="set-links-cont-width <!--{{toefl=active}}-->"><a href="#" >雅思考试</a></div>
                <div class="set-links-cont-width <!--{{ielts=active}}-->"><a href="#" >托福培训</a></div>
                <div class="set-links-cont-width <!--{{toefl=test.html}}-->"><a href="#" >牛校网</a></div>
                <div class="set-links-cont-width"><a href="#" >考鸭网</a></div>
                <div class="set-links-cont-width"><a href="#" >托福培训</a></div>
                <div class="set-links-cont-width"><a href="#" >天津托福培训</a></div>    
                <div class="set-links-cont-width"><a href="#" >甘肃培训</a></div>
                <div class="set-links-cont-width"><a href="#" >中小学辅导网</a></div>
                <div class="set-links-cont-width"><a href="#" >英语学习</a></div>
                <div class="set-links-cont-width"><a href="#" >托福培训</a></div>
                <div class="set-links-cont-width"><a href="#" >托福考试</a></div>
                <div class="set-links-cont-width"><a href="#" >小站SAT</a></div>
                <div class="set-links-cont-width"><a href="#" >亦鸥托福</a></div>
                <div class="set-links-cont-width"><a href="#" >广州考试英语</a></div>
                <div class="set-links-cont-width"><a href="#" >师出教育</a></div>
                <div class="set-links-cont-width"><a href="#" >海口培训网</a></div>
                <div class="set-links-cont-width"><a href="#" >韩国留学</a></div>
                <div class="set-links-cont-width"><a href="#" >选课网</a></div>
            </div>
        </div>
    </div>
    <div class="foot-nav">
        <a href="#">版权申明</a>|
        <a href="#">隐私保护</a>|
        <a href="#">意见反馈</a>|
        <a href="#">联系我们</a>|
        <a href="#">关于我们</a>|
        <a href="#">网站地图</a>|
        <a href="#">最新资讯</a>
        <br><br>
        © 2015 ZHAN.com All Rights Reserved. 沪ICP备15003744号-1
    </div>
</div>
```
