'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var eslint = require('gulp-eslint'); 
var reporter = require('eslint-html-reporter');
var fs       = require('fs');
var dir = './eslintReport';


gulp.task('lint', function(){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src([ path.join(conf.paths.src, '/app/**/*.js'), '!'+ path.join(conf.paths.src, '/app/**/*Spec.js') ])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules.    ,'!node_modules/**'
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())

        .pipe(eslint.format(reporter, function(results) {
          fs.writeFileSync(path.join("eslintReport",'eslint-report-results.html'), results)
        }))
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last.    
        .pipe(eslint.failAfterError());
});