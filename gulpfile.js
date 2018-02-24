const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'src'
      },
    })
  })

gulp.task('makeCopy', function(){
    return gulp.src('src/*.html')
           .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function(){
    return gulp.src('src/assets/img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/assets/img/'))
});

gulp.task('jsminify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('script', function(){
    gulp.src('src/assets/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('sass', function(){
    return gulp.src('src/assets/scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/assets/css/'))
            .pipe(browserSync.reload({
                stream: true
              }))
});



gulp.task('default', ['makeCopy', 'imagemin', 'sass', 'script'])


gulp.task('watch',['browserSync', 'sass'],function(){
    gulp.watch('src/assets/js/*.js', ['script']);
    gulp.watch('src/assets/sass/*.js', ['sass']);
    gulp.watch('src/assets/img/*', ['imagemin']);
    gulp.watch('src/*.html', ['makeCopy']);
})
