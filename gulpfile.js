var gulp      = require('gulp');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var uglify    = require('gulp-uglify');
var gutil     = require('gulp-util');
var filesize  = require('gulp-filesize');
var minifyHTML= require('gulp-minify-html');
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');

var paths = {
    css: {
        src: './sass',
        files: './src/sass/**/*.scss',
        dest: './dist/css/'
    },
    js: {
        src: './js',
        files: './src/js/**/*.js',
        dest: './dist/js/'
    },
    fonts: {
	  	src: './src/fonts/**/*',
	  	dest: './dist/fonts/'
    },
    images: {
        src: './src/images/**/*',
        dest: './dist/images/'
    },
    html: {
        src: './src/**/*.html',
        dest: './dist/'
    }
}

var server = {
    file: '/dist/index.html',
    host: 'localhost',
    port: '3333',
    browser: 'firefox'
}

//Opens webserver
gulp.task('webserver', () => {
  return gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

//Open the browser
gulp.task('openbrowser', () => {
  return opn( 'http://' + server.host + ':' + server.port + server.file );
});

//Make pretty css from SASS files
gulp.task('css', () => {
    return gulp.src(paths.css.files)
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths : [paths.css.src],
        errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.css.dest))
    .on('error', gutil.log)
});

gulp.task('fonts', () => {
	  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
});

//Throw JS together and minify
gulp.task('js', () => {
    return gulp.src(paths.js.files)
    .pipe(uglify())
    .pipe(filesize())
    .pipe(gulp.dest(paths.js.dest))
    .on('error', gutil.log)
});

//Optimize images
gulp.task('images', () => {
     return gulp.src(paths.images.src)
     .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
         use: [pngquant()]
     }))
     .pipe(gulp.dest(paths.images.dest));
});

//Optimize HTML
gulp.task('html', () => {
    return gulp.src(paths.html.src)
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.html.dest));
});

//Look for changes
gulp.task('watch', () => {
  gulp.watch(paths.css.files, gulp.series('css'));
  gulp.watch(paths.js.files, gulp.series('js'));
  gulp.watch(paths.html.src, gulp.series('html'));
});

//Serve up the fancy part
gulp.task('serve', gulp.series('css','js','fonts','images','html','webserver','openbrowser','watch'), () => {
});
//gulp.task('serve', ['css','js','fonts','images','html','webserver','openbrowser','watch']);
