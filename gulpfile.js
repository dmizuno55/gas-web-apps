var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var transform = require('gulp-transform');
var rename = require('gulp-rename');

function toHtml_(content, file) {
  switch(path.extname(file.path)) {
    case '.js':
      return '<script type="text/javascript">\n' + content + '\n</script>';
    case '.css':
      return '<style type="text/css">\n' + content + '\n</style>';
    default:
      return content;
  }
}

gulp.task('default', ['clean', 'gasconv:js', 'gasconv:css']);

gulp.task('clean', function() {
  gulp.src('templates/dest')
    .pipe(clean());
});

gulp.task('gasconv:css', function() {
  gulp.src('templates/src/css/**/*.css')
    .pipe(transform('utf8', toHtml_))
    .pipe(rename({
      extname: '.css.html'
    }))
    .pipe(gulp.dest('templates/dest/css'))
});

gulp.task('gasconv:js', function() {
  gulp.src('templates/src/js/**/*.js')
    .pipe(transform('utf8', toHtml_))
    .pipe(rename({
      extname: '.js.html'
    }))
    .pipe(gulp.dest('templates/dest/js'))
});
