var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	runSequence = require('run-sequence');

gulp.task('default', function(callback) {
	runSequence('phaserJs', 'gameJs', 'jqueryJs', callback);

});


// concat phaser dependencies into dependencies.js
gulp.task('phaserJs', function() {

	return gulp.src(['js/lib/phaser.min.js', 'js/lib/box2d-plugin-full.min.js'])
		.pipe(concat('phaserDeps.js'))
		.pipe(gulp.dest('js/lib'));
});

// concat/mini game js into game.mini.js
gulp.task('gameJs', function() {

	return gulp.src(['js/boot.js', 'js/preload.js', 'js/intro.js', 'js/cutscene.js'])
		.pipe(concat('game.js'))
		.pipe(uglify())
		.pipe(rename('game.min.js'))
		.pipe(gulp.dest('js'));
});


// concat/mini allGamesJs js into allGamesJs.mini.js
// gulp.task('allGamesJs', function() {

// 	return gulp.src(['js/game1/*.js', 'js/game2/*.js', 'js/game3/*.js'])
// 		.pipe(concat('allGamesJs.js'))
// 		.pipe(rename('allGamesJs.min.js'))
// 		.pipe(gulp.dest('js'));
// });


// concat jQuery dependencies into jqueryDeps.js
gulp.task('jqueryJs', function() {

	return gulp.src(['web/js/jquery-2.1.4.min.js', 'web/js/jquery.placeholder.min.js', 'web/js/jquery.validate.min.js'])
		.pipe(concat('jqueryDeps.js'))
		.pipe(uglify())
		.pipe(rename('jqueryDeps.min.js'))
		.pipe(gulp.dest('web/js'));
});

