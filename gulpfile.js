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

//CSS OPTIMIZATIOn
gulp.task('css', function () {
	gulp.src('source/sass/view.scss')
	.pipe(sourcemaps.init())
	 .pipe(sass())
	 .pipe(minifyCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/css'))	
});
//JAVASCRIPT OPTIMIZATIOn
gulp.task('js',function(){
	gulp.src([
		"source/js/jquery.min.js",
		"source/js/bootstrap.min.js",
		"source/js/app.js"
	])
	.pipe(sourcemaps.init())
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	
	.pipe(gulp.dest('build/js'))
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
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('source/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(''));
});
gulp.task('default',['css','js','img','minify-html']);