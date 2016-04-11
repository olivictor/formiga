// Karma configuration
// Generated on Tue Oct 13 2015 15:00:16 GMT+0000 (UTC)

var path = require('path')
var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    basePath: 'test',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      path.dirname(require.resolve('jasmine-core')) + '/jasmine-core/jasmine.js',
      '../node_modules/babel-polyfill/dist/polyfill.js',
      '*-test.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     '*-test.js': ['webpack'],
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],

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
    browsers: ['PhantomJS'],
  })
}
