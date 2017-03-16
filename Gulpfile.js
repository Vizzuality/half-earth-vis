const gulp = require('gulp');
const gulpCopy = require('gulp-copy');

gulp.task('copyfonts', function() {
  gulp.src(['./src/fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copyvideos', function() {
  gulp.src(['./src/videos/**/*'])
    .pipe(gulp.dest('./dist/videos'));
});

gulp.task('copyothers', function() {
  gulp.src(['./src/favicon.ico', './src/robots.txt'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['copyfonts', 'copyvideos', 'copyothers'])
