/* ===============================================
 * GULP VARIABLES
 * =============================================== */
var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
var plumberErrorHandler = {
    errorHandler: plugins.notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

var contentPath = 'public';
/* ===============================================
 * GULP TASK DEV
 * =============================================== */
gulp.task('sass', function() {
    return gulp.src(contentPath + '/sass/style.scss')
    	.pipe(plugins.plumber(plumberErrorHandler))
    	.pipe(plugins.changed(contentPath + '/sass/style.scss'))
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(contentPath))
        .pipe(plugins.livereload());
});

gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch(contentPath + '/sass/**/*.scss', ['sass']);
    gulp.watch(contentPath + '/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

/* ===============================================
 * GULP TASK PROD
 * =============================================== */

gulp.task('sass-prod', function() {
    return gulp.src('*/sass/style.scss')
    	.pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(plugins.sourcemaps.write("./"))
        .pipe(gulp.dest('*/dist/'))
});

gulp.task('prod', ['sass-prod']);