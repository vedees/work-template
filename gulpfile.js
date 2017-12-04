var     gulp         =       require('gulp'),
        pug          =       require('gulp-pug'),
        stylus       =       require('gulp-stylus'),
        browserSync  =       require('browser-sync'),
        concat       =       require('gulp-concat'),
        uglify       =       require('gulp-uglifyjs'),
        cssnano      =       require('gulp-cssnano'),
        rename       =       require('gulp-rename');

//Pug files
gulp.task('pug', function () {
    return gulp
        .src('./dev/pug/pages/*.pug')
        .pipe(pug({
                pretty: true
            }
        ))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream: true}))

});

//Stylus files
gulp.task('styles', function(){
    return gulp
    .src('./dev/stylus/main.styl')
    .pipe(browserSync.reload({stream: true}))
    .pipe(stylus())
    .pipe(gulp.dest('./build/static/css/'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/static/css/'))
});

//JS files
gulp.task('scripts', function() {
    return gulp
    .src('./dev/js/main.js')
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('./build/static/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/static/js'))
});


//Server
gulp.task('serve', function() {
    browserSync({
        server:{
            baseDir: 'build'
        },
        notify: false      //Disable notifications
    })
});

//Watch
gulp.task('watch', function(){
    gulp.watch('./dev/stylus/**/*.styl', ['styles']);
    gulp.watch('./dev/pug/**/*.pug', ['pug']);
    gulp.watch('./dev/js/**/*.js', ['scripts']);
});


gulp.task('default', ['styles','pug','scripts','serve','watch']);