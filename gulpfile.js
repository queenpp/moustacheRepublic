//declaring the variables

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');
var concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug');
// development mode?
var devBuild = (process.env.NODE_ENV !== 'production');

// folders
var folder = {
    src: 'src/',
    build: 'build/'
};

//configuring browsersync

gulp.task('browser-sync', function () {
    var files = [
        './src/css/*.css',
        './src/html/*.html',
        './src/*.php'
        ];

    //initialize browsersync with PHP server

    browserSync.init(files, {
        proxy: "http://localhost:3000/MRpractical/src/html",        browser: ['google chrome']
    });
});

//configure Sass task when .scss file changed
//browsersync will also reload

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({
            'outputStyle': 'compressed',
            precision: 2,
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        })).pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('useref', function () {
    return gulp.src('src/html/*.html')
        .pipe(useref())
        //minifies only if it's a js file
        .pipe(gulpIf('src/js/*.js', uglify()))
        .pipe(gulp.dest('build/js'))
});
gulp.task('images', function () {
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(out));
});
// HTML processing
gulp.task('html', function () {
    var out = folder.build + 'html/';
    var page = gulp.src(folder.src + 'html/**/*')
        .pipe(newer(out));

    // minify production code
    if (!devBuild) {
        page = page.pipe(htmlclean());
    }


    return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function () {

    var jsbuild = gulp.src(folder.src + 'js/**/*')
        .pipe(deporder())
        .pipe(concat('main.js'));

    if (!devBuild) {
        jsbuild = jsbuild
            .pipe(stripdebug())
            .pipe(uglify());
    }

    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

gulp.task('watch', function () {
    gulp.watch(folder.src + 'scss/**/*', gulp.series('sass'));
    gulp.watch(folder.src + 'images/**/*', gulp.series('images'));
    gulp.watch(folder.src + 'html/**/*', gulp.series('html'));
    gulp.watch(folder.src + 'js/**/*', gulp.series('js'));
});

//gulp.task('minifycss', function(){
//   return gulp.src('./app/css/sytles.css')
//    .pipe(cssnano())
//    .pipe(gulp.dest('./app/css'))
//});
//createdefault task to start two of the tasks above

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch', 'useref', 'images', 'html'));
