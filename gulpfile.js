// 변수선언 = require('모듈이름');
var gulp = require('gulp');

var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var include = require('gulp-include');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

// pipe()는 모듈의 기능을 실행해주는 함수

// 새로 고침
gulp.task('livereload', function(){
  gulp.src(['html/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*', ['livereload']);
  gulp.watch('html_src/**', ['include', 'livereload']);
  gulp.watch('css_src/**', ['sass', 'livereload']);
  gulp.watch('js_src/**', ['jsconcat', 'livereload']);
});

// header, footer, 공통영역 분리
gulp.task('include', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// sass 실행
gulp.task('sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css/'));
});

// concat 실행 - 여러 개의 파일을 하나의 파일로 합치는 기능
/*
gulp.task('tabmenu', function() {
  return gulp.src('js_src/tab_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('tab_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('gnbmenu', function() {
  return gulp.src('js_src/gnb_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('gnb_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('timingfunction', function() {
  return gulp.src('js_src/timing_function/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('timing_function.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('imagesliding', function() {
  return gulp.src('js_src/image_sliding/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('image_sliding.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});

gulp.task('accmenu', function() {
  return gulp.src('js_src/acc_menu/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('acc_menu.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('js/'));
});
*/

//gulp.task('jsconcat', ['tabmenu', 'gnbmenu', 'timingfunction', 'imagesliding', 'accmenu']);

gulp.task('default', ['livereload', 'include', 'sass', 'watch']);