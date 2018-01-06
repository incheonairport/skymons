// 변수선언 = require('모듈이름');
var gulp = require('gulp');

var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var include = require('gulp-include');

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');

var index = require('gulp-index');

var fileData = require('gulp-pub-list');

var minify = require('gulp-minify');

var concat = require('gulp-concat');

/**
 * reload
 */

// livereload
gulp.task('reload:livereload', function(){
  gulp.src(['html/*', 'css/*', 'js/*', '*'])
      .pipe( livereload() );
});

// watch
gulp.task('reload:watch', function() {
  livereload.listen();
  gulp.watch('*', ['reload:livereload']);
  gulp.watch('css_src/**', ['build:sass:dev', 'reload:livereload']);
  gulp.watch('html_src/**', ['build:include:html', 'reload:livereload']);
  gulp.watch('js_src/**', ['build:js:compress', 'reload:livereload']);
});

/**
 * build default
 */

// build html including header/footer
gulp.task('build:include:html', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("html/"));
});

// build sass for dev
gulp.task('build:sass:dev', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('../static/sm/css/'));
});

// build js compress
gulp.task('build:js:compress', function(){

  gulp.src(['js_src/common*.js', 'js_src/base*.js'])
      .pipe(concat('base_function.js'))
      .pipe(minify({
        ext:{
          src : '.debug.js',
          min : '.min.js'
        }
      }))
      .pipe(gulp.dest('../static/sm/js'));

  gulp.src(['js_src/common*.js', 'js_src/layer*.js'])
      .pipe(concat('layer_function.js'))
      .pipe(minify({
        ext:{
          src : '.debug.js',
          min : '.min.js'
        }
      }))
      .pipe(gulp.dest('../static/sm/js'));

});

/**
 * build seperately
 */

// build file list to json data
gulp.task('seperate:build:fileListJson', function() {
  fileData();
});

// copy js library file
gulp.task('seperate:copy:jsLib', function() {
  return gulp.src('js_src/lib/*.*')
      .pipe(gulp.dest('../static/sm/js/lib/'));
});

// copy file list json
gulp.task('seperate:copy:fileListJson', function(){
  return gulp.src('data_src/*.json')
      .pipe(concat('co_file_data.json'))
      .pipe(gulp.dest('../static/guide/data'));
});

/**
 * release
 */

// release html
gulp.task('release:html', function(){
  gulp.src("html_src/*.html")
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest("../release/sm/html/"));
});

// release sass
gulp.task('release:sass', function(){
  return gulp.src('css_src/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('../release/static/sm/css/'));
});

// release js
gulp.task('release:js:compress', function(){
  gulp.src(['js_src/common*.js', 'js_src/base*.js'])
      .pipe(concat('base_function.js'))
      .pipe(minify({
        ext:{
          src : '.debug.js',
          min : '.min.js'
        }
      }))
      .pipe(gulp.dest('../release/static/sm/js'));

  gulp.src(['js_src/common*.js', 'js_src/layer*.js'])
      .pipe(concat('layer_function.js'))
      .pipe(minify({
        ext:{
          src : '.debug.js',
          min : '.min.js'
        }
      }))
      .pipe(gulp.dest('../release/static/sm/js'));

});

// release js library file
gulp.task('release:copy:jsLib', function() {
  return gulp.src('js_src/lib/*.*')
      .pipe(gulp.dest('../release/static/sm/js/lib'));
});

// release images
gulp.task('release:images', function(){
  return gulp.src('../static/sm/images/*.*')
      .pipe(gulp.dest('../release/static/sm/images/'));
});

// release fonts
gulp.task('release:fonts', function(){
  return gulp.src('../static/sm/fonts/**')
      .pipe(gulp.dest('../release/static/sm/fonts/'));
});


/**
 * run task
 */

gulp.task('default', ['build:include:html', 'build:sass:dev', 'build:js:compress', 'reload:watch']);

gulp.task('release', ['release:html', 'release:sass', 'release:js:compress', 'release:copy:jsLib', 'release:images', 'release:fonts']);