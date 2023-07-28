import { DotenvConfigLoader } from './DotenvConfigLoader'

describe('DotenvConfigLoader', () => {
  it('should load config from .env file', () => {
    const loader = new DotenvConfigLoader('apps/gzipr/.env')
    const config = loader.load()

    expect(config).toEqual({
      HOST: 'localhost',
      NODEMON: 'true',
      NODE_ENV: 'development',
      PORT: '3000',
      STORAGE_TYPE: 'local',
      TLS_CERT: '',
      TLS_KEY: '',
      TRUST_PROXY: '1',
      UPLOADS_DIR: 'uploads',
      USE_HTTPS: '0',
    })
  })
})
