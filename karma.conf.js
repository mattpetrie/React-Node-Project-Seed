var RewirePlugin = require('rewire-webpack');
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],

        // list of files / patterns to load in the browser
        files: [
          'test/shims/**/*.js',
          'src/**/*-spec.{js,jsx}',
        ],

        // list of files to exclude
        exclude: [],

        mochaReporter: {
          output: 'autowatch',
        },

        // set what notifications the OSX notifications reporter should send
        notifyReporter: {
          reportEachFailure: true,
          reportSuccess: true,
        },

        // plugins: [
        //   'karma-webpack'
        // ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
          './**/*-spec.{js,jsx}': ['webpack'],
        },

        // karma.conf.js is in root directory, but all server related files are
        // under the server directory, so we have to proxy the correct path
        proxies: {
          '/api/': 'server/api/',
        },

        // test results reporter to use
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'notify'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        browsers: ['PhantomJS', 'Chrome'],

        webpack: {
          target: 'web',
          debug: true,
          plugins: [
            new RewirePlugin()
          ],
          module: webpackConfig.module,
        },

        webpackMiddleware: {
          noInfo: true,
        },
    });
};
