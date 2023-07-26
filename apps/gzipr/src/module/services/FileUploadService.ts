import fs from 'fs'
import path from 'path'
import busboy from 'busboy'
import { Logger } from '@gzipr/core'
import { config } from '../../config'
import { LocalFileStorage } from '../infra'
import {
  FileUploadError,
  InvalidFileExtension,
  InvalidGzipFile,
  InvalidMimeType,
} from './FileUploadErrors'

type Upload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- busboy headers type
  headers: Record<string, any>
  pipe: (destination: unknown) => unknown
}

const UPLOADS_DIR = config.get('UPLOADS_DIR')

export class FileUploadService {
  private readonly logger: Logger
  private readonly storage: LocalFileStorage
  private readonly directory: string

  constructor(logger: Logger, storage: LocalFileStorage) {
    this.logger = logger
    this.storage = storage
    this.directory = path.resolve(process.cwd(), UPLOADS_DIR)
  }

  private validateFile(fileInfo: {
    filename: string
    mimeType: string
  }): void | never {
    if (!isAllowedExtension(fileInfo.filename)) {
      this.logger.debug(
        `FileUpload: Invalid file extension (${fileInfo.filename})`
      )
      throw new InvalidFileExtension(
        `The file extension of '${fileInfo.filename}' is not allowed. Only '.gz' files are allowed.`
      )
    }

    if (!isAllowedMimeType(fileInfo.mimeType)) {
      this.logger.debug(`FileUpload: Invalid mime-type (${fileInfo.mimeType})`)
      throw new InvalidMimeType(
        `The mime-type '${fileInfo.mimeType}' is not allowed. Only 'application/gzip' and 'application/x-gzip' are allowed.`
      )
    }
  }

  private createDirectoryIfNotExist(): void {
    if (!fs.existsSync(this.directory)) {
      this.logger.log("FileUpload: Upload directory doesn't exist. Creating...")
      fs.mkdirSync(this.directory, { recursive: true })
    }
  }

  public async upload({ headers, pipe }: Upload): Promise<void> {
    return new Promise((resolve, reject) => {
      const bb = busboy({ headers })

      let fileName: string
      let isValidGzip = false
      let fileUploadSuccess = false

      bb.on('file', (_, file, fileInfo) => {
        file.pause()

        try {
          this.validateFile(fileInfo)
        } catch (error) {
          file.destroy()
          return reject(error)
        }

        fileName = fileInfo.filename
        this.createDirectoryIfNotExist()

        const filePath = path.join(this.directory, fileName)
        const writable = this.storage.createWriteStream(filePath)

        file.on('data', (chunk: Buffer) => {
          if (isWellFormedGzip(chunk)) {
            isValidGzip = true
            fileUploadSuccess = true
            this.logger.debug('FileUploadService Well-formed gzip file')
            writable.write(chunk)
          } else {
            this.logger.debug(
              `FileUploadService Malformed gzip file. Deleting...`
            )
            fs.unlinkSync(filePath)
            fileUploadSuccess = false
            return reject(
              new InvalidGzipFile(
                `The file '${fileName}' is not a valid gzip file.`
              )
            )
          }
        })

        file.on('end', () => {
          if (!isValidGzip) {
            fs.unlink(filePath, () =>
              this.logger.debug(`File '${filePath}' deleted`)
            )
            return reject(
              new InvalidGzipFile(
                `The file '${fileName}' is not a valid gzip file.`
              )
            )
          }

          writable.end()
        })

        file.resume()
        file.pipe(writable)

        file.on('error', (error: Error) => {
          writable.end()
          this.logger.debug(`Error uploading file '${fileName}'`, error.stack)
          return reject(
            new FileUploadError(`Error uploading file '${fileName}'`)
          )
        })
      })

      bb.on('finish', () => {
        if (fileUploadSuccess) {
          this.logger.log(`File '${fileName}' uploaded successfully`)
        }
        resolve()
      })

      bb.on('error', (error: Error) => {
        this.logger.debug(`FileUploadService (L170)`, error.stack)
        return reject(
          new FileUploadError(
            `Error uploading file '${fileName}. busboy.on('error') was called.'`
          )
        )
      })

      pipe(bb)
    })
  }
}

function isAllowedExtension(filename: string) {
  const allowedExtensions = ['.gz']
  const ext = path.extname(filename)
  return allowedExtensions.includes(ext)
}

function isAllowedMimeType(mimeType: string) {
  const allowedMimeTypes = ['application/gzip', 'application/x-gzip']
  return allowedMimeTypes.includes(mimeType)
}

function isWellFormedGzip(file: Buffer) {
  return file.length >= 2 && file[0] === 0x1f && file[1] === 0x8b
}
