var gulp = require('gulp')
var ghPages = require('gulp-gh-pages')
var path = require('path')


gulp.task('deploy', function(cb) {
    return gulp.src('./build/**/*')
    	.pipe(ghPages())
})
