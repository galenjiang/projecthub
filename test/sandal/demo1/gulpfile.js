var SRC = 'src';
var STATICDIST = 'dist';
var TEMPLATEDIST = 'dist'

var SRCCONFIG = {
    html: 'html',
    scss: 'scss',
    js: 'js',
    image: 'images',
    asset: 'assets'
}

var path = require('path');
var gulp = require('gulp');

//引用自动刷新浏览器
var browserSync = require('browser-sync');
// 监控变动路径
var watchPath = require('gulp-watch-path');

// ejs
var ejs = require('gulp-ejs');

// browserify discarded
// var browserify = require('gulp-browserify');
var browserify = require('browserify');
var through2 = require('through2');


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



// 编译 html
gulp.task('buildhtml', function() {
    return gulp.src(path.join(SRC, SRCCONFIG['html'], '**/*.html'))
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest(path.join(TEMPLATEDIST, SRCCONFIG['html'])))
});

// 监控 html
gulp.task('watchhtml', function() {
    return gulp.watch(path.join(SRC, SRCCONFIG['html'], '**/*.html'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, SRCCONFIG['html']), path.join(TEMPLATEDIST, SRCCONFIG['html']));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(plumber())
            .pipe(ejs())
            .pipe(gulp.dest(paths.distDir))
    })
})


// 编译 sass
gulp.task('buildsass', function() {
    return gulp.src(path.join(SRC, SRCCONFIG['scss'], '**/*.+(scss|css)'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifycss())
        .pipe(autoprefix({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest(path.join(STATICDIST, 'css')))
});

// 监控 sass
gulp.task('watchsass', function() {
    gulp.watch(path.join(SRC, SRCCONFIG['scss'], '**/*.+(scss|css)'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, SRCCONFIG['scss']), path.join(STATICDIST, 'css'));
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
    })
});


// 编译 js
gulp.task('buildjs', function() {
    return gulp.src(path.join(SRC, SRCCONFIG['js'], '**/*.js'))
        .pipe(plumber())
        .pipe(through2.obj(function(file, enc, next) {
            var b = browserify([file.path])
            b.bundle(function(err, res) {
                // assumes file.contents is a Buffer
                file.contents = res;
                next(null, file);
            });
        }))
        // .pipe(uglify()) //压缩js
        .pipe(gulp.dest(path.join(STATICDIST, SRCCONFIG['js'])));
});

// 监控 js
gulp.task('watchjs', function() {

    return gulp.watch(path.join(SRC, SRCCONFIG['js'], '**/*.js'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, SRCCONFIG['js']), path.join(STATICDIST, SRCCONFIG['js']));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(path.join(SRC, SRCCONFIG['js'], '**/*.js'))
            .pipe(plumber())
            .pipe(through2.obj(function(file, enc, next) {
                browserify(file.path)
                    .bundle(function(err, res) {
                        // assumes file.contents is a Buffer
                        file.contents = res;
                        next(null, file);
                    });
            }))
            // .pipe(uglify()) //压缩js
            .pipe(gulp.dest(path.join(STATICDIST, SRCCONFIG['js'])));
    })
})

// 编译 images
gulp.task('buildimage', function() {
    return gulp.src(path.join(SRC, SRCCONFIG['image'], '**/*.+(png|jpg|gif|svg)'))
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
        .pipe(gulp.dest(path.join(STATICDIST, SRCCONFIG['image'])))
});

// 监控 images
gulp.task('watchimage', function() {
    return gulp.watch(path.join(SRC, SRCCONFIG['image'], '**/*.+(png|jpg|gif|svg)'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, SRCCONFIG['image']), path.join(STATICDIST, SRCCONFIG['image']));
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
    })
})

// 编译 assets
gulp.task('buildasset', function() {
    return gulp.src(path.join(SRC, SRCCONFIG['asset'], '**/*.*'))
        .pipe(gulp.dest(path.join(STATICDIST, SRCCONFIG['asset'])))
});

// 监控 assets
gulp.task('watchasset', function() {
    return gulp.watch(path.join(SRC, SRCCONFIG['asset'], '**/*.*'), function(event) {
        // 路径
        var paths = watchPath(event, path.join(SRC, SRCCONFIG['asset']), path.join(STATICDIST, SRCCONFIG['asset']));
        // 打印变动路径
        gutil.log(colors.yellow(event.type) + ' ' + paths.srcPath);
        gutil.log(colors.green('to') + ' ' + paths.distPath);
        // src下变动文件复制到dist
        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

// 自动刷新任务
gulp.task('broswer-sync', function() {
    browserSync({
        server: {
            baseDir: path.join(TEMPLATEDIST)
        }
    });
});
// 示例
// .pipe(browserSync.reload({
//     stream: true
// }));

// 直接编译到正式环境
gulp.task('build', ['buildhtml',
    // "broswer-sync",
    'buildsass',
    'buildsass',
    'buildjs',
    'buildimage',
    'buildasset'
])


// 监控编译目录，除了js外都单独编译，js由于依赖较多，全部编译
gulp.task('watch', [
    // "broswer-sync",
    'watchhtml',
    'watchsass',
    'watchjs',
    'watchimage',
    'watchasset'
])
