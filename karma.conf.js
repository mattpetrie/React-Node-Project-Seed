module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
            'test/shims/**/*.js',
            'test/helpers/**/*.{js,jsx}',
            'test/spec/**/*.{js,jsx}',
            'src/**/*-spec.{js,jsx}',
        ],

        // list of files to exclude
        exclude: [],

        mochaReporter: {
          output: 'autowatch',
        },

        notifyReporter: {
          reportEachFailure: true,
          reportSuccess: true,
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './**/*-spec.{js,jsx}': ['browserify'],
            'test/**/*.{js,jsx}': ['browserify'],
        },

        // karma.conf.js is in root directory, but all server related files are
        // under the server directory, so we have to proxy the correct path
        proxies: {
          '/api/': 'server/api/',
        },

        browserify: {
            debug: true,
            transform: [ 'reactify','rewireify'],
            extensions: ['js', 'jsx'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
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
        browsers: ['PhantomJS'],
    });
};