import { jest } from '@jest/globals'
import Stream from 'stream'

jest.mock('../../infra/LocalFileStorage', () => ({
  LocalFileStorage: jest.fn().mockImplementation(() => ({
    createWriteStream: jest.fn().mockReturnValue(
      new Stream.Writable({
        write(chunk, encoding, callback) {
          callback()
        },
      })
    ),
  })),
}))
jest.mock('@gzipr/core', () => {
  class DummyHttpException {}
  class DummyBaseController {}
  class DummyUseCase {}

  return {
    HttpException: DummyHttpException,
    BaseController: DummyBaseController,
    UseCase: DummyUseCase,
    HttpStatus: {
      BAD_REQUEST: 400,
    },
    AppConfig: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockImplementation((key: string) => {
        const config: { [key: string]: string } = {
          // env vars
          UPLOADS_DIR: '/tmp/uploads',
        }
        return config[key]
      }),
    })),
  }
})
