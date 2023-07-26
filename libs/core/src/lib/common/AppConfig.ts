import { Config, ConfigLoader, AsyncConfigLoader } from './Types'

/**
 * Union of default {@link AppConfig} keys.
 */
type AppConfigKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'HOST'
  | 'NODE_ENV'
  | 'TRUST_PROXY'
  | 'LOG_LEVEL'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

type ConfigurationObject = Record<PropertyKey, string>

/**
 * Allows to load application config from different sources.
 * @param loaders - Array of {@link ConfigLoader} instances.
 */
export class AppConfig implements Config {
  private configuration: ConfigurationObject = {}

  constructor(loaders: ConfigLoader[]) {
    this.configuration = loaders.reduce(
      (acc, loader) => ({ ...acc, ...loader.load() }),
      {}
    )
  }

  async loadAsync(loaders: AsyncConfigLoader[]) {
    const configuration: ConfigurationObject = {}
    const promises = loaders.map((loader) => loader.load())
    const configs = await Promise.all(promises)
    configs.forEach((c) => Object.assign(configuration, c))
    this.configuration = { ...this.configuration, ...configuration }
  }

  public get<K extends AppConfigKey>(key: K): string | undefined {
    return this.configuration[key]
  }
}
