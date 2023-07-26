import path from 'path'
import { config } from '../../../config'
import { ReadStream } from 'fs'
import { FileNotFoundError, FileValidationError } from './DownloadErrors'
import {
  ok,
  left,
  right,
  UseCase,
  Either,
  UnexpectedError,
  Result,
  FileStorage,
  Logger,
} from '@gzipr/core'

type Response = Either<
  FileValidationError | FileNotFoundError | UnexpectedError,
  Result<ReadStream>
>

type DownloadFileDTO = {
  filename: string
}

export class DownloadUseCase extends UseCase<DownloadFileDTO, Response> {
  private readonly storage: FileStorage
  private readonly directory: string

  constructor(logger: Logger, storage: FileStorage) {
    super(logger)
    this.storage = storage
    this.directory = config.get('UPLOADS_DIR')
  }

  async execute(dto: DownloadFileDTO): Promise<Response> {
    try {
      const { filename } = dto

      if (!filename) {
        return left(new FileValidationError('Filename is required'))
      }

      const absolutePath = path.resolve(process.cwd(), this.directory, filename)

      const found = await this.storage.exists(absolutePath)

      if (!found) {
        return left(
          new FileNotFoundError(
            `The file '${filename}' was not found. Are you sure you uploaded it? Check if the filename is correct and includes the extension '.gz'.`
          )
        )
      }

      const result = await this.storage.read(absolutePath)

      return right(ok(result))
    } catch (error) {
      this.logger.debug('DownloadUseCase - Catch', error.stack)
      return left(new UnexpectedError())
    }
  }
}
