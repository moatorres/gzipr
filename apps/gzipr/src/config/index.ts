import { AppConfig } from '@gzipr/core'
import { TLSConfigLoader } from './loaders/TLSConfigLoader'
import { DotenvConfigLoader } from '../config/loaders'

export const config = new AppConfig([
  new DotenvConfigLoader('apps/gzipr/.env'),
  new TLSConfigLoader({
    keyFilePath: 'apps/gzipr/src/config/ssl/server.key',
    certFilePath: 'apps/gzipr/src/config/ssl/server.crt',
  }),
])
