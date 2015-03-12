var gulp      = require('gulp');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn       = require('opn');

var paths = {

    styles: {
        src: './sass',
        files: './sass/**/*.scss',
        dest: './css'
    }

}

var server = {

  host: 'localhost',
  port: '8001',
  browser: 'firefox'

}

var displayError = function(error) {

    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",'');

    if(error.fileName)
        errorString += ' in ' + error.fileName;
    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    console.error(errorString);
}

gulp.task('default', ['webserver','openbrowser','watch']);

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port, server.browser );
});

gulp.task('sass', function () {
    gulp.src(paths.styles.files)
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src]
    }))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('watch', function() {
  gulp.watch('sass/style.scss', ['sass']);
});