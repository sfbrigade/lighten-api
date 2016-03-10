import _debug from 'debug'
import baseConfig from './_base'
import createDevConfig from './_development'
import createProdConfig from './_production'

const debug = _debug('app:config')
debug('Create configuration.')
debug(`Apply environment overrides for NODE_ENV "${baseConfig.env}".`)

let overrides
if (baseConfig.env === 'development') {
  overrides = createDevConfig(baseConfig)
} else if (baseConfig.env === 'production') {
  overrides = createProdConfig(baseConfig)
}

export default Object.assign({}, baseConfig, overrides)
