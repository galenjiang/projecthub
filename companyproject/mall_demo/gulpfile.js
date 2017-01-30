var SRC = 'src';
var STATICDIST = 'build';
var TEMPLATEDIST = 'build'

var path = require('path');
var gulp = require('gulp');

//引用自动刷新浏览器
var browserSync = require('browser-sync');
// 监控变动路径
var watchPath = require('gulp-watch-path');

// ejs
var ejs = require('gulp-ejs');

// browserify
var browserify = require('gulp-browserify');

//js压缩
var uglify = require('gulp-uglify');
//引用sass插件
var sass = require('gulp-sass');
//压缩css
var minifycss = require('gulp-minify-css');
// 自动前缀
var autoprefix = require('gulp-autoprefixer');

//压缩图片
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// 工具类
var gutil = require('gulp-util');
// 配置颜色
var colors = gutil.colors;
// 报错
var plumber = require('gulp-plumber');
//同时执行多个任务
var runSequence = require('run-sequence');


// 编译 html
gulp.task('buildhtml', function() {
    return gulp.src(path.join(SRC, 'html/**/*.html'))
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest(path.join(TEMPLATEDIST, 'html')))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 监控html
gulp.task('watchhtml', function() {
    return gulp.watch(path.join(SRC, 'html/**/*.html'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, 'html'), path.join(TEMPLATEDIST, 'html'));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(plumber())
            .pipe(ejs())
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
})


//sass任务
gulp.task('buildsass', function() {
    return gulp.src(path.join(SRC, 'scss/**/*.+(scss|css)'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifycss())
        .pipe(autoprefix({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest(path.join(STATICDIST, 'css')))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 监控sass
gulp.task('watchsass', function() {
    gulp.watch(path.join(SRC, 'scss/**/*.+(scss|css)'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, 'scss'), path.join(STATICDIST, 'css'));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefix({
                browsers: ['last 2 versions', 'Android >= 4.0']
            }))
            .pipe(minifycss())
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
});


// buildjs
gulp.task('buildjs', function() {
    return gulp.src(path.join(SRC, 'js/**/*.js'))
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true
            // debug: !gulp.env.production
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(STATICDIST, 'js')))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// 监控js
gulp.task('watchjs', function() {
    return gulp.watch(path.join(SRC, 'js/**/*.js'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, 'js'), path.join(STATICDIST, 'js'));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(plumber())
            .pipe(browserify({
                insertGlobals: true
                // debug: !gulp.env.production
            }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
})

// 监控images
gulp.task('buildimages', function() {
    return gulp.src(path.join(SRC, 'images/**/*.+(png|jpg|gif|svg)'))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant({
                quality: "60",
                speed: 4
            })]
        }))
        .pipe(gulp.dest(path.join(STATICDIST, 'images')))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 监控images
gulp.task('watchimages', function() {
    gulp.watch(path.join(SRC, 'images/**/*.+(png|jpg|gif|svg)'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, 'images'), path.join(STATICDIST, 'images'));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(plumber())
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [pngquant({
                    quality: "60",
                    speed: 4
                })]
            }))
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
})


// 编译assets
gulp.task('buildassets', function() {
    return gulp.src(path.join(SRC, 'assets/**/*.*'))
        .pipe(gulp.dest(path.join(STATICDIST, 'assets')))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 监控assets
gulp.task('watchassets', function() {
    return gulp.watch(path.join(SRC, 'assets/**/*.*'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, 'assets'), path.join(STATICDIST, 'assets'));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.reload({
                stream: true
            }));
    })
})

//自动刷新任务
gulp.task('broswer-sync', function() {
    browserSync({
        server: {
            baseDir: path.join(TEMPLATEDIST)
        }
    });
});



//直接编译到正式环境，用于测试，测试需要借助wechat平台，所以需要先编译到正式环境
gulp.task("default", function() {
    runSequence([
        "broswer-sync",
        "buildhtml",
        "buildsass",
        "buildjs",
        "buildimages",
        "buildassets"
    ])
});

// watch
gulp.task("watch", function() {
    runSequence([
        "broswer-sync",
        "watchhtml",
        "watchsass",
        "watchjs",
        "watchimages",
        "watchassets"
    ])
});
