import { AppConfig } from './AppConfig'

describe('AppConfig', () => {
  it('should load configuration from synchronous loaders', () => {
    const config = new AppConfig([
      {
        load: () => ({ NODE_ENV: 'test' }),
      },
    ])
    expect(config.get('NODE_ENV')).toEqual('test')
  })

  it('should load configiguration from asynchronous loaders', async () => {
    const config = new AppConfig([
      {
        load: () => ({ NODE_ENV: 'test' }),
      },
    ])

    await config.loadAsync([
      {
        load: () => Promise.resolve({ PORT: '3000' }),
      },
    ])

    expect(config.get('NODE_ENV')).toEqual('test')
    expect(config.get('PORT')).toEqual('3000')
  })

  it('should return undefined for unknown key', () => {
    const config = new AppConfig([])
    expect(config.get('UNKNOWN_KEY')).toBeUndefined()
  })
})
