var 	gulp         =       require('gulp'),
        pug          =       require('gulp-pug'),
        stylus       =       require('gulp-stylus'),
        browserSync  =       require('browser-sync');

//Stylus files
gulp.task('styles', function(){
	return gulp
	.src('./dev/stylus/main.styl')
	.pipe(stylus())
	.pipe(gulp.dest('./build/static/css/'))
    .pipe(browserSync.stream())
});

//Pug files
gulp.task('pug', function () {
	return gulp
	.src('./dev/pug/pages/*.pug')
 	.pipe(pug(
        {
            pretty: true
        }
    ))
 	.pipe(gulp.dest('./build/'))
});


//Server
gulp.task('serve', function() {
    browserSync.init({
        server: "./build",
        notify: false
    })
});

//Watch
gulp.task('watch', function(){
	gulp.watch('./dev/stylus/**/*.styl', ['styles']);
	gulp.watch('./dev/pug/**/*.pug', ['pug']);
});


gulp.task('default', ['serve','styles','pug','watch']);