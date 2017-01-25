'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    return wiredep(wiredepOptions).js
        .concat([
            path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join(conf.paths.src, '/app/**/*.js'),
            path.join(conf.paths.src, '/**/*Spec.js'),
            //path.join(conf.paths.src, '/**/*.mock.js'),
            path.join(conf.paths.src, '/**/*.html')
        ]);
}

module.exports = function(config) {

    var configuration = {
        files: listFiles(),

        singleRun: true,
        reporters: ['progress', 'coverage','html'],
        coverageReporter: {
          type : 'html',
          dir : 'coverage/',

        },
        coverageReporter: {
            reporters:[
                {type: 'html', dir:'coverage/'}, 
                {type: 'text-summary'}
            ]
        },
        htmlReporter: {
            outputFile: 'unitTestReport/units.html'
        },
        
        autoWatch: false,

        frameworks: ['jasmine', 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'myAppT'
        },

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-angular-filesort',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage',
            'karma-htmlfile-reporter'
        ],

         // web server port
        port: 9876,

         // enable / disable colors in the output (reporters and logs)
        colors: true,

        preprocessors: {
            'src/**/*.html': ['ng-html2js'],
            'src/app/**/!(*datePicker).js': ['coverage']
            // '!src/app/common/datepicker': ['coverage']
        }
        

    };

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};