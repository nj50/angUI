'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var util = require('util');

var karma = require('karma');
var jasmineBrowser = require('gulp-jasmine-browser');

function runTests(singleRun, done) {
    karma.server.start({
        configFile: path.join(__dirname, '/../karma.conf.js'),
        singleRun: singleRun,
        autoWatch: !singleRun
    }, function() {
        done();
    });
}

function doneCoverage(){
   browserSync.init({
        server: {
            baseDir: "./coverage/PhantomJS 2.1.1 (Mac OS X 0.0.0)/"
            //directory: true
        }
    });
}

gulp.task('test',function(done) {
    runTests(true, doneCoverage);
});

gulp.task('test:auto', ['watch'], function(done) {
    runTests(false, done);
});


var files = ['bower_components/angular/angular.js',
			'bower_components/angular-resource/angular-resource.js',
 			'bower_components/angular-ui-router/release/angular-ui-router.js',
         	'bower_components/angular-mocks/angular-mocks.js',
         	path.join(conf.paths.src, '/app/**/index.module.js'),
  			path.join(conf.paths.src, '/app/**/*.js') 
        //path.join(conf.paths.src, '/app/**/!(*Spec).js'),  //Add all JS Except file end with "Spec.js" RND -- not to remove
       ];

    gulp.task('testBrowser', function () {
        return gulp.src(files)
          .pipe(jasmineBrowser.specRunner())
          .pipe(jasmineBrowser.server({ port: 8888 }));
    });