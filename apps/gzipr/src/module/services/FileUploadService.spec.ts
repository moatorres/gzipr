import fs from 'fs'
import Stream from 'stream'
import FormData from 'form-data'

import './__mocks__/shared'
import { Logger } from '@gzipr/core'
import { LocalFileStorage } from '../infra'

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
}))

import { FileUploadService } from './FileUploadService'

describe('FileUploadService', () => {
  let service: FileUploadService
  let logger: Logger
  let storage: LocalFileStorage
  let mockLog: jest.SpyInstance

  beforeEach(() => {
    logger = console
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
