var gulp = require('gulp');

var autoprefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var minifyHTML = require('gulp-minify-html');

var connect = require('gulp-connect');

//CSS OPTIMIZATIOn
gulp.task('css', function () {
	gulp.src('source/sass/view.scss')
	.pipe(sourcemaps.init())
	 .pipe(sass())
	 .pipe(minifyCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/css'))	
	.pipe(connect.reload());
});
//JAVASCRIPT OPTIMIZATIOn
gulp.task('js',function(){
	gulp.src([
		"source/js/jquery.min.js",
		"source/js/bootstrap.min.js",
		"source/js/app.js"
	])
	.pipe(sourcemaps.init())
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/js'))
	.pipe(connect.reload())
});
//HTML MINIFY
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('source/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(''))
	.pipe(connect.reload())
});
//IMG OPTIMIZATIOn
gulp.task('img',function(){
	 gulp.src('source/img/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
    .pipe(gulp.dest('build/img'));
    
    gulp.src('source/img/pf/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('build/img/pf'));
});

gulp.task('connect', function() {
  connect.server({
	  //host:"localhost/test",//you can point this if PHP
	  livereload: true
	});
});

gulp.task('watch', function () {
  gulp.watch(['source/sass/css/*.scss'], ['css'])
  gulp.watch(['source/js/*.js'], ['js'])
  gulp.watch(['source/*.html'], ['minify-html'])
});

gulp.task('livereload', ['connect', 'watch']);

gulp.task('default',['css','js','img','minify-html']);