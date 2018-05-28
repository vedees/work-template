var     gulp         =       require('gulp'),
        pug          =       require('gulp-pug'),
        stylus       =       require('gulp-stylus'),
        tinypng      =       require('gulp-tinypng'),
        plumber      =       require('gulp-plumber'),
        notify       =       require('gulp-notify'),
        concat       =       require('gulp-concat'),
        uglify       =       require('gulp-uglifyjs'),
        jshint       =       require('gulp-jshint'),
        sourcemaps   =       require('gulp-sourcemaps'),
        cssnano      =       require('gulp-cssnano'),
        autoprefixer =       require('gulp-autoprefixer'),
        browserSync  =       require('browser-sync'),
        cache        =       require('gulp-cache'),
        gutil        =       require('gulp-util'),
        ftp          =       require('vinyl-ftp'),
        del          =       require('del');

var config = {
        devFolder:           './dev',
        buildFolder:         './build',
        secondBuildFolder:   '/static'
};


//Pug
gulp.task('pug', function () {
    return gulp
        .src(config.devFolder +'/pug/pages/*.pug')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(pug({
                pretty: true
            }
        ))
        .pipe(gulp.dest(config.buildFolder))
        .on('end', browserSync.reload)
});


//Stylus Dev
gulp.task('style:dev', function(){
    return gulp
        .src(config.devFolder +'/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(stylus({
            //Libs include here - 'devFolder' +'/sylus/libs.styl'
            'include css': true
        }))
        .pipe(autoprefixer({
            //3v for Flex-box
            browsers: ['last 3 version']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/css/'))
        .pipe(browserSync.reload({stream: true}))
});

//Stylus Build
gulp.task('style:build', function(){
    return gulp
        .src(config.devFolder +'/stylus/main.styl')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/css/'))
});


//JS Dev
gulp.task('script:dev', function() {
    return gulp

        //Libs here:
        .src([
         // EXAMPLE:
         // './node_modules/jquery/dist/jquery.min.js',
            config.devFolder +'/js/libs/*.js',
            config.devFolder +'/js/common.js'
        ])
        .pipe(plumber())

        /* 
        Jshint - detects errors and potential problems in JavaScript code.
        Errors are output in the console with syntax highlighting.
        You can add a list of ignored files on - .jshintignore (file is hidden)
        Also, you can comment on 2 lines below if you dont need jshint.
        */
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/js'))
        .pipe(browserSync.reload({stream: true}))
});

//JS Build
gulp.task('script:build', function() {
    return gulp

        //Libs here:
        .src([
         // EXAMPLE:
         // './node_modules/jquery/dist/jquery.min.js',
            config.devFolder +'/js/libs/*.js',
            config.devFolder +'/js/common.js'
        ])
        .pipe(plumber())

        /* 
        Jshint - detects errors and potential problems in JavaScript code.
        Errors are output in the console with syntax highlighting.
        You can add a list of ignored files on - .jshintignore (file is hidden)
        Also, you can comment on 2 lines below if you dont need jshint.
        */
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/js'))
});


//Img Develop
gulp.task('img:dev', function() {
    return gulp
        .src(config.devFolder +'/img/**/*.{jpg,gif,png,svg,ico}')
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/img'));

});

//Img Build
gulp.task('img:build', function() {
    return gulp
        .src(config.devFolder +'/img/**/*.{jpg,gif,png,svg,ico}')

        /* 
        Go to https://tinypng.com/developers
        Replace 'YOU_API_KEY' in your API
        */
        .pipe(tinypng('YOU_API_KEY'))
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/img'));

});


//Fonts
gulp.task('fonts', function() {
    return gulp
        .src(config.devFolder +'/fonts/**/*.*')
        .pipe(gulp.dest(config.buildFolder +config.secondBuildFolder +'/fonts'));

});


//Other Files
gulp.task('other', function() {
    return gulp
        .src([
            config.devFolder +'/.htaccess',
            config.devFolder +'/*.{txt,xml}'
        ])
        .pipe(gulp.dest(config.buildFolder));

});


//Clean buildFolder
gulp.task('clean', function() {
    return del.sync(config.buildFolder)
});


//Watch
gulp.task('watch', function(){
    gulp.watch(config.devFolder +'/pug/**/*.pug', ['pug']);
    gulp.watch(config.devFolder +'/stylus/**/*.styl', ['style:dev']);
    gulp.watch(config.devFolder +'/js/**/*.js', ['script:dev']);
    gulp.watch(config.devFolder +'/img/**/*.img', ['img:dev']);
});


//Server
gulp.task('serve', function() {
    browserSync({
        server:{
            baseDir: config.buildFolder
        },
        // port: 8080,
        // open: true,
        notify: false
    })
});


//MAIN TASK

//gulp
gulp.task('default', ['clean','pug','style:dev','script:dev','fonts','img:dev','other','watch','serve']);

//build
gulp.task('build', ['clean','style:build','script:build','pug','fonts','img:build','other']);

//deploy
gulp.task('deploy', function() {
    var conn = ftp.create({
        host:      'hostname.com',
        user:      'user',
        password:  'password',
        parallel:  10,
        log: gutil.log
    });
    var globs = [
        config.devFolder +'/**',
        config.devFolder +'/.htaccess'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/server/folder'));
});

//cache
gulp.task('cache', function() {
    return cache.clearAll();
});


//Error Message
var onError = function(err) {
    notify.onError({
        title:    "Error in " + err.plugin,
        message: err.message
    })(err);
    this.emit('end');
};