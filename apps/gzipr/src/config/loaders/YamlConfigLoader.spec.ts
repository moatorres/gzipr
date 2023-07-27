import { YamlConfigLoader } from './YamlConfigLoader'

describe('YamlConfigLoader', () => {
  it('should load config from yaml file', async () => {
    const loader = new YamlConfigLoader(
      'apps/gzipr/src/config/loaders/__mocks__/config.yaml'
    )

    const config = await loader.load()

    expect(config).toEqual({
      env: 'test-yaml',
      port: 9999,
      name: 'gzipr',
    })
  })
})
