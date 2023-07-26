import { ConfigLoader } from '@gzipr/core'

/**
 * Get config from environment variables.
 */
export class EnvConfigLoader implements ConfigLoader {
  load(): Record<string, string> {
    return process.env
  }
}
