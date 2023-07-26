import { EnvConfigLoader } from './EnvConfigLoader'

describe('EnvConfigLoader', () => {
  it('should load config from environment variables', () => {
    const loader = new EnvConfigLoader()
    const config = loader.load()
    expect(config).toEqual(process.env)
    expect(config.NODE_ENV).toEqual('development')
  })
})
