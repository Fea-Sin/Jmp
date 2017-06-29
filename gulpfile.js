const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

gulp.task('less-css', function() {
	/**
	 * sourcemaps less 编译后生成 source map 文件
	 * 
	 */
	
	var autoperfixerOptions = {
		browers: ['last 200 version', '> 1%'],
		cascade: false
	}
	return gulp.src('./src/less/**/*.less')
						 .pipe(sourcemaps.init())
						 .pipe(less())
						 .pipe(sourcemaps.write())
						 .pipe(autoprefixer(autoperfixerOptions))
						 .pipe(concat('style.css'))
						 .pipe(gulp.dest('./dist/css'))
						 .pipe(rename({suffix: '.min'}))
						 .pipe(cssmin())
						 .pipe(gulp.dest('./dist/css'))
						 .pipe(notify({message: 'css 样式处理完成'}))
})

gulp.task('js', function() {
	return gulp.src('./src/js/*.js')
						 .pipe(concat('plugin.js'))
						 .pipe(gulp.dest('./dist/js'))
						 .pipe(rename({suffix: '.min'}))
						 .pipe(uglify())
						 .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })						 
						 .pipe(gulp.dest('./dist/js'))
						 .pipe(notify({message: 'js 处理完成'}))
})

gulp.task('watch', function() {

	// css 监控
	gulp.watch(['./src/less/**/*.less'], ['less-css'])
	// js 监控
	gulp.watch(['./src/js/*.js'], ['js'])
})

gulp.task('default', function() {
	console.log('构建开始');
	gulp.start('less-css', 'js', 'watch');
})