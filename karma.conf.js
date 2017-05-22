module.exports = function(karma) {
  karma.set({
    plugins: ['karma-browserify', 'karma-coverage', 'karma-mocha', 'karma-phantomjs-launcher'],

    frameworks: ['browserify', 'mocha'],

    files: [
      'src/**/*.js',
      'test/**/*.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js'
    ],

    reporters: ['dots', 'coverage'],

    exclude: ['test/module-systems.js'],

    preprocessors: {
      'src/**/*.js' : ['browserify', 'coverage'],
      'test/**/*.js': ['browserify']
    },

    //  coverage reporter configuration
    coverageReporter: {
      dir:'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    browsers: ['PhantomJS']
  });
}
