import { AppConfig } from '@gzipr/core'
import { DotenvConfigLoader } from '../config/loaders'

export const config = new AppConfig([new DotenvConfigLoader('apps/gzipr/.env')])
