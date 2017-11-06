var 	gulp     =      require('gulp'),
        pug      = 		require('gulp-pug');
        stylus   =		require('gulp-stylus');

gulp.task('style', function(){
	return gulp
	.src('./dev/styles/**/*.styl')    
	.pipe (stylus()) 
	.pipe (gulp.dest('./static/css/'))
});

gulp.task('pug', function () {
	return gulp.src('./dev/*.pug')
 	.pipe(pug())
 	.pipe(gulp.dest('./static/'))
});


gulp.task('watch', function(){
	gulp.watch('./dev/stylus/**/*.styl', ['style']) 
	gulp.watch('./dev/*.pug', ['pug']) 
});


gulp.task('default', ['style','pug','watch']);