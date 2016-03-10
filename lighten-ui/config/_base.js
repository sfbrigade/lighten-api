import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'
import pkg from '../package.json'

const options = Object.assign({
  debug: true,
  coverage: true,
  'debug-window': false,
  'tests-debug': false,
  watch: false
}, argv)
const debug = _debug('app:config:_base')
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '../'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_test: 'tests',
  node_modules: 'node_modules',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: true,
  compiler_quiet: false,
  compiler_public_path: '',
  compiler_stats: {
    chunks: true,
    chunkModules: false,
    colors: true,
    errorDetails: true
  },
  compiler_vendor: [
    'history',
    'react',
    'react-redux',
    'react-router',
    'redux',
    'redux-actions',
    'react-router-redux'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled: options.coverage,
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'html', dir: 'coverage' }
  ],
  tests_watch: options.watch
}

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && options.debug,
  '__DEBUG_NEW_WINDOW__': options['debug-window'],
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base: base,
    client: base.bind(null, config.dir_client),
    dist: base.bind(null, config.dir_dist)
  }
})()

export default config
