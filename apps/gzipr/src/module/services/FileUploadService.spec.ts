import fs from 'fs'
import crypto from 'crypto'
import Stream from 'stream'
import FormData from 'form-data'

import { Logger } from '@gzipr/core'
import { LocalFileStorage } from '../infra'
import { InvalidFileExtension } from './FileUploadErrors'

jest.mock('fs')
jest.mock('../infra')
jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
}))
jest.mock('../infra/LocalFileStorage', () => ({
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
    AppConfig: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockImplementation((key: string) => {
        const config: { [key: string]: string } = {
          // env vars
          UPLOADS_DIR: '/tmp/uploads',
        }
        return config[key]
      }),
    })),
    // we could also mock the Logger class here, but we don't need to
  }
})

import { FileUploadService } from './FileUploadService'

describe('FileUploadService', () => {
  let service: FileUploadService
  let logger: Logger
  let storage: LocalFileStorage
  let mockLog: jest.SpyInstance

  beforeEach(() => {
    logger = console as unknown as Logger
    mockLog = jest.spyOn(logger, 'log')
    storage = new LocalFileStorage(logger)
    service = new FileUploadService(logger, storage)
  })

  afterEach(() => {
    mockLog.mockRestore()
  })

  it('should upload a valid gzip file', async () => {
    const form = new FormData() // create a form data
    const mockFile = Buffer.from([0x1f, 0x8b])
    form.append('file', mockFile, {
      contentType: 'application/gzip',
      filename: 'test.gz',
    })

    const mockHeaders = form.getHeaders() // get headers from the form data

    await service.upload({
      headers: mockHeaders,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pipe: (bb) => form.pipe(bb as any),
    })

    expect(fs.existsSync).toHaveBeenCalled()
    expect(storage.createWriteStream).toHaveBeenCalled()
    expect(mockLog).toHaveBeenCalledWith(`File 'test.gz' uploaded successfully`)
  })

  it('should reject invalid file extension', async () => {
    const mockFile = new Stream.Readable()
    mockFile.push(Buffer.from([0x1f, 0x8b]))
    mockFile.push(null)

    // generate a random boundary
    const boundary = `----WebKitFormBoundary${crypto
      .randomBytes(16)
      .toString('hex')}`

    const mockHeaders = {
      'content-type': `multipart/form-data; boundary=${boundary}`,
    }
    const mockPipe = () => mockFile

    await expect(
      service.upload({ headers: mockHeaders, pipe: mockPipe })
    ).rejects.toThrow(InvalidFileExtension)
  })

  it('should reject invalid mime type', async () => {
    const mockFile = new Stream.Readable()
    mockFile.push(Buffer.from([0x1f, 0x8b]))
    mockFile.push(null)

    const mockHeaders = { 'content-type': 'application/pdf' }
    const mockPipe = () => mockFile

    await expect(
      service.upload({ headers: mockHeaders, pipe: mockPipe })
    ).rejects.toThrow(Error)
  })

  it('should reject invalid gzip file', async () => {
    const mockFile = new Stream.Readable()
    mockFile.push(Buffer.from([0x1f, 0x8a])) // invalid gzip
    mockFile.push(null)

    const mockHeaders = { 'content-type': 'multipart/form-data' }
    const mockPipe = () => mockFile

    await expect(
      service.upload({ headers: mockHeaders, pipe: mockPipe })
    ).rejects.toThrow(Error)
  })
})
