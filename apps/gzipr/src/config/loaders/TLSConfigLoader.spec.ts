import { TLSConfigLoader } from './TLSConfigLoader'

describe('TLSConfigLoader', () => {
  it('should load config from file system', () => {
    const loader = new TLSConfigLoader({
      keyFilePath: 'apps/gzipr/src/config/ssl/server.key',
      certFilePath: 'apps/gzipr/src/config/ssl/server.crt',
    })

    const config = loader.load()

    expect(config).toEqual({
      TLS_KEY: expect.any(String),
      TLS_CERT: expect.any(String),
    })
  })

  it('should load config from environment variables', () => {
    process.env.TLS_KEY = 'key'
    process.env.TLS_CERT = 'cert'

    const loader = new TLSConfigLoader({
      keyFilePath: 'apps/gzipr/src/config/ssl/server.key',
      certFilePath: 'apps/gzipr/src/config/ssl/server.crt',
    })

    const config = loader.load()

    expect(config).toEqual({
      TLS_KEY: 'key',
      TLS_CERT: 'cert',
    })
  })
})
