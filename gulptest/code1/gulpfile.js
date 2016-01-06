'use strict';
var gulp = require('gulp');
var less = require("gulp-less");
var minifyCss = require("gulp-minify-css");
var connect = require("gulp-connect");
/*npm install --save-dev gulp-connect
https://www.npmjs.com/package/gulp-connect
*/
gulp.task('default',function(){
    console.log('hello world');
});

gulp.task('dest',function(){
	gulp.src ('src/index.html').
	pipe(gulp.dest('dist/'));
});


gulp.task('dest1',function(){
	gulp.src ('src/*/*.*').
	pipe(gulp.dest('dist/'));
});

/*把src下所有文件夹包括子文件夹都复制到dist下*/
gulp.task('dest2',function(){
	gulp.src ('src/**/*.*').pipe(gulp.dest('dist/'));
});

gulp.task('default',function(){
	console.log("gulp is started");
	var watcher = gulp.watch('src/**/*.*', ['dest2']);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});


/*gulp插件
npm install gulp-less --save
https://www.npmjs.com/package/gulp-less
 1.编译less文件*/

gulp.task('style',function(){
	gulp.src("src/css/*.less").pipe(less()).pipe(minifyCss()).pipe(
		gulp.dest("dist/css")
	);
});

gulp.task('serve',function(){
	connect.server({
		root:'dist',
		livereload:true
	})
	gulp.watch('dist/**/*.*',['reload']);
});

gulp.task('reload', function () {
  gulp.src('dist/**/*.*')
    .pipe(connect.reload());
});