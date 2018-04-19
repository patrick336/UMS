var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var csscomb = require('gulp-csscomb');

var config = {
    proxy: 'http://ums.net', // change it to your development domain
    srcCss: [
        './webroot/src/scss/**/*.scss'
    ],
    destCss: './webroot/css',
    srcJs: [
        './webroot/src/js/popper.js',
        './webroot/src/js/bootstrap.js',
        './webroot/src/js/app.js'
    ],
    destJs: './webroot/js',
    srcImg: './webroot/src/img',
    dstImg: './webroot/img',
    img: {
        jpg: '/**/*.jpg',
        png: '/**/*.png',
        gif: '/**/*.gif',
        jpeg: '/**/*.jpeg',
        svg: '/**/*.svg',
        ico: '/**/*.ico',
    },
    srcImgCompress: ['./webroot/src/img/**/*.jpg', './webroot/src/img/**/*.png'],
    dstImgCompress: ['./webroot/img/**/*.jpg', './webroot/img/**/*.png'],
    srcBackendCss: [
        './webroot/src/backend/scss/**/*.scss'
    ],
    destBackendCss: './webroot/backend/css',
    srcBackendJs: [
    ],
    destBackendJs: './webroot/backend/js',
    cakeModels: './src/Model/**/*.php',
};

/**
* Removes all files inside `tmp` directory
*/
gulp.task('clean-tmp', function () {
    console.log('Cleaning tmp...');
    return gulp.src('./tmp/*')
    .pipe(clean({force: false}));
});

/**
* Removes all images declared in `dstImages`
*/
gulp.task('clean-images', function () {
    console.log('Cleaning images...');
    return gulp.src(config.dstImgCompress)
    .pipe(clean({force: false}));
});

gulp.task('csscomb', function() {
    return gulp.src(config.srcCss)
        .pipe(csscomb())
        .pipe(gulp.dest('./webroot/csscomb'));
});

/**
* Compiles Sass files for front-end use
*/
gulp.task('build-css', function () {
    gulp.src(config.srcCss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.init({
        loadMaps: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.destCss))
    .pipe(minCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.destCss));
});

/**
* Compiles Sass files for back-end use
*/
gulp.task('build-css-backend', function () {
    gulp.src(config.srcBackendCss)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.destBackendCss))
    .pipe(minCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(config.destBackendCss));
});

/**
* Compiles JS files for front-end use
*/
gulp.task('build-js', function () {
    return gulp.src(config.srcJs)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.destJs))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.destJs));
});

/**
* Compiles JS files for back-end use
*/
gulp.task('build-js-backend', function () {
    return gulp.src(config.srcBackendJs)
    .pipe(plumber())
    .pipe(concat('ecommerce.js'))
    .pipe(gulp.dest(config.destBackendJs))
    .pipe(rename('ecommerce.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.destBackendJs));
});

/**
* Browser refresh on declared files change
*/
gulp.task('browser-sync', function () {
    browserSync.init({
        files: ['**/*.php', '**/*.ctp', 'webroot/*.html', '**/*.css', './webroot/src/scss/**/*.scss'],
        proxy: config.proxy
    });
});

/**
* Copies images from src to dst location
*/
gulp.task('images', function () {
    gulp.src([config.srcImg + config.img.jpg, config.srcImg + config.img.jpeg, config.srcImg + config.img.png, config.srcImg + config.img.gif, config.srcImg + config.img.svg, config.srcImg + config.img.ico])
    .pipe(plumber())
    .pipe(gulp.dest(config.dstImg));
});

/**
* Removes dst images, copresses and copies images from src to dst location
*/
gulp.task('images-compress', function () {
    gulp.start('clean-images');
    gulp.src(config.srcImgCompress)
    .pipe(plumber())
    .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
    .pipe(gulp.dest(config.dstImg));
});

/**
* Watch models and cleans tmp directory if something changed
*/
gulp.task('watch-models', function () {
    return watch(config.cakeModels, function () {
        gulp.start('clean-tmp');
    });
});

/**
* Watch images and copies images from src to dst directory
*/
gulp.task('watch-images', function () {
    return watch(config.srcImg, function () {
        gulp.start('images');
    });
});

/**
* Main watcher
*/
gulp.task('watcher', function () {
    gulp.watch(config.srcCss, ['build-css']).on('change', function (evt) {
        console.log('[watcher] File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...');
    });
    gulp.watch(config.srcJs, ['build-js']);
    gulp.watch(config.srcBackendJs, ['build-js-backend']);
    gulp.watch(config.srcBackendCss, ['build-css-backend']);
    gulp.start('watch-images');
    gulp.start('watch-models');
});

/**
* Default task
*/
gulp.task('default', ['build-css', 'build-js', 'images', 'watcher']);

/**
* Maint task for frontend devs
*/
gulp.task('frontend', ['build-css', 'build-js', 'browser-sync', 'images', 'watcher']);

/**
* Main task for backend devs
*/
gulp.task('backend', ['build-css', 'build-js', 'build-js-backend', 'build-css-backend', 'images', 'watcher']);
