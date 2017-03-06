'use strict';

var gulp            = require('gulp');
var run             = require('run-sequence');
var sourcemaps      = require('gulp-sourcemaps');
var babel           = require('gulp-babel');
var sass            = require('gulp-sass');
var imagemin        = require('gulp-imagemin');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync').create();
var del             = require('del');

var paths = {
    views: 'app/**/*.html',
    styles: 'app/sass/**/*.scss',
    vendorStyles: 'app/css/*.css',
    scripts: [
        {
            dist: 'index.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.popup.js',
                'app/js/jquery.animation.js'
            ]
        },
        {
            dist: 'history.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.animation.js'
            ]
        },
        {
            dist: 'booking.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.animation.js',
                'app/js/jquery.booking.js',
                'app/js/jquery.google-autocomplite.js'
            ]
        },
        {
            dist: 'single.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.animation.js',
                'app/js/jquery.popup.js',
                'app/js/jquery.single.js'
            ]
        },
        {
            dist: 'services.min.js',
            contains: [
                'app/js/jquery.main.js',
                'app/js/jquery.animation.js',
                'app/js/jquery.scroll-to.js'
            ]
        }
    ],
    vendorScripts: 'app/js/vendors/**/*.js',
    watchScripts: 'app/js/**/*.js',
    images: 'app/img/**/*',
    pictures: 'app/pic/**/*',
    php: 'app/php/**/*',
    fonts: 'app/fonts/**/*',
    video: 'app/video/**/*'
};


gulp.task('clean', function (cb) {
    return del('dist', cb);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('views', function () {
    return gulp.src(paths.views, {
            base: 'app'
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('vendorScripts', function () {
    return gulp.src(paths.vendorScripts, {
        base: 'app/js/vendors'
    }).pipe(gulp.dest('dist/js/vendors'));
});

gulp.task('vendorStyles', function () {
    return gulp.src(paths.vendorStyles, {
        base: 'app/css'
    }).pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts, {
        base: 'app/fonts'
    }).pipe(gulp.dest('dist/fonts'));
});

gulp.task('video', function () {
    return gulp.src(paths.video, {
        base: 'app/video'
    }).pipe(gulp.dest('dist/video'));
});

gulp.task('php', function () {
    return gulp.src(paths.php, {
        base: 'app/php'
    }).pipe(gulp.dest('dist/php'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task( 'scripts', function () {
    for ( var i = 0; i < paths.scripts.length; i++ ){
        gulp.src( paths.scripts[ i ].contains )
            .pipe(sourcemaps.init())
            // .pipe(babel({presets: ['es2015']})) //for js6
            .pipe(uglify())
            .pipe(concat(paths.scripts[ i ].dist))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/js/'));
    }
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        // .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('pictures', function() {
    return gulp.src(paths.pictures)
        // .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/pic'));
});

gulp.task('watch', function() {
    gulp.watch(paths.watchScripts,   ['scripts', browserSync.reload]);
    gulp.watch(paths.images,    ['images',  browserSync.reload]);
    gulp.watch(paths.pictures,    ['pictures',  browserSync.reload]);
    gulp.watch(paths.fonts,    ['fonts']);
    gulp.watch(paths.fonts,    ['video']);
    gulp.watch(paths.php,    ['php']);
    gulp.watch(paths.styles,    ['styles']);
    gulp.watch(paths.vendorStyles,    [ 'vendorStyles' ]);
    gulp.watch(paths.views,     ['views',   browserSync.reload]);
});

function serve() {
    return run('styles', 'video', 'scripts', 'vendorScripts', 'vendorStyles', 'php', 'fonts',  'images', 'pictures', 'views', 'serve');
}

gulp.task('default', ['clean'], serve());
