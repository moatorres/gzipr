import Stream from 'stream'

import './__mocks__/shared'
import { LocalFileStorage } from '../infra'
import { InvalidFileExtension } from './FileUploadErrors'

jest.mock('busboy', () => {
  return jest.fn().mockImplementation(() => ({
    on: (event, callback) => {
      if (event === 'file') {
        const fileInfo = {
          filename: 'test.txt',
          mimeType: 'application/gzip',
        }
        const file = new Stream.Readable()
        file.push(Buffer.from([0x1f, 0x8b]))
        file.push(null)
        callback(event, file, fileInfo)
      }
    },
  }))
})

import { FileUploadService } from './FileUploadService'

describe('FileUploadService (Busboy)', () => {
  it('should reject invalid file extension', async () => {
    const logger = console
    const storage = new LocalFileStorage(logger)
    const service = new FileUploadService(logger, storage)
    const mockHeaders = {
      'content-type': 'multipart/form-data',
    }

    const mockPipe = (busboy) => {
      busboy.emit('file')
      return new Promise((resolve) => {
        busboy.on('finish', resolve)
      })
    }

    await expect(
      service.upload({ headers: mockHeaders, pipe: mockPipe })
    ).rejects.toEqual(new InvalidFileExtension())
  })
})
