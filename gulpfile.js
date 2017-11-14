var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    scss = require('gulp-sass');

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['scss'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/scss/*.scss", ['scss']);
    gulp.watch("*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('scss', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(gulp.dest("assets/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);