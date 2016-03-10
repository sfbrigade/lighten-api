import yargs from 'yargs'
import config from './config'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:karma')
debug('Create configuration.')

webpackConfig.resolve.alias = {
  sinon: 'sinon/pkg/sinon.js'
}

const karmaConfig = {
  files: [
    require.resolve('phantomjs-polyfill'),
    require.resolve('es6-promise'),
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !config.tests_watch,
  frameworks: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['spec'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon\/pkg\/sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    externals: {
      // need these if we decide to start using enzyme (https://github.com/airbnb/enzyme/)
      // jsdom: 'window',
      // cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'text-encoding': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    stats: config.compiler_stats,
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.tests_debug) {
  karmaConfig.logLevel = 'LOG_DEBUG'
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

module.exports = (cfg) => cfg.set(karmaConfig)
