/*
 * @CreateTime: Sep 12, 2017 12:49 PM
 * @Author: wh01am
 * @Contact: wh01am@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Sep 12, 2017 2:31 PM
 * @Description: 公司网站构建文件
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const del = require('del');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const shell = require('gulp-shell');
const connect = require('gulp-connect');

const path = process.env.PWD;

/**
 * 公共错误处理函数
 */
function commonErrorHandle(event) {
    gutil.beep();
    gutil.log(event)
};

/* 删除dist目录，删除所有之前编译的内容 */
gulp.task('clean', (cb) => {
    return del(['dist'], cb);
});

/* 移动字体库 */
gulp.task('fonts', () => {
    return gulp.src('source/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

/* 压缩图片 */
gulp.task('imagemin', () => {
    return gulp.src('source/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images/'));
});

/* 压缩合并js逻辑 */
gulp.task('jsmin', () => {
    return gulp.src('source/js/**/*.js')
        .pipe(plumber({ errorHandler: commonErrorHandle }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js/'))
});

/* 压缩合并css样式 */
gulp.task('cssmin', () => {
    return gulp.src('source/css/**/*.scss')
        .pipe(plumber({ errorHandler: commonErrorHandle }))
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
});

/* 开发阶段，编译生成页面 */
gulp.task('pages', shell.task(`pug -O ${path}/locale/zh.json source/pages -o dist/ -P `));

/* 编译英文版本 */
gulp.task('pages_en', shell.task(`pug -O ${path}/locale/en.json source/pages -o dist/ -P `));

/* 生产环境中，编译生成页面 */
gulp.task('pagesmin', shell.task('pug source/pages/*.pug -o dist/'));

/* liveReload服务器*/
gulp.task('server', () => {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

/* 加载html页面 */
gulp.task('html', () => {
    gulp.src('./dist/*.html')
        .pipe(connect.reload());
})

/**
 * 检测文件变化
 */
gulp.task('watch', () => {
    gulp.watch(['source/**/*'], ['pages', 'cssmin', 'jsmin']).on('change', (e) => {
        console.info(`Source->File ${e.path} + has been changed`)
    })
});

/**
 * 默认为开发者环境
 */
gulp.task('default', () => {
    runSequence('clean', 'fonts', 'pages', 'cssmin', 'jsmin', 'imagemin', 'server', 'watch');
});

/**
 * 编译英文版本
 */
gulp.task('english', () => {
    runSequence('clean', 'fonts', 'pages_en', 'cssmin', 'jsmin', 'imagemin', 'server', 'watch');
});

/**
 * 构建生产版本
 */
gulp.task('build', (cb) => {
    runSequence('clean', 'fonts', 'pagesmin', 'cssmin', 'jsmin', 'imagemin', cb)
});