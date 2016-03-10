import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from '../config'
import webpackConfig from '../webpack.config'
import _debug from 'debug'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: config.compiler_quiet,
  noInfo: config.compiler_quiet,
  lazy: false,
  stats: config.compiler_stats,
}).listen(port, host, function (err, result) {
  if (err) {
    debug(err)
  }
  debug(`Server is now running at ${host}:${port}.`)
})
