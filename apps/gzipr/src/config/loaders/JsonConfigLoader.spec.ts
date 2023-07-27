import { JsonConfigLoader } from './JsonConfigLoader'

describe('JsonConfigLoader', () => {
  it('should load config from json file', () => {
    const loader = new JsonConfigLoader(
      'apps/gzipr/src/config/loaders/__mocks__/config.json'
    )

    const config = loader.load()

    expect(config).toEqual({
      env: 'test-json',
      port: 9999,
      name: 'gzipr',
    })
  })
})
