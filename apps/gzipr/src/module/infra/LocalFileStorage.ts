import { promisify } from 'util'
import fs, { ReadStream } from 'fs'
import { FileStorage, Logger } from '@gzipr/core'
import { FileNotFound } from './LocalFileStorageError'

const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)
const readdir = promisify(fs.readdir)

export class LocalFileStorage implements FileStorage {
  constructor(private readonly logger: Logger) {
    this.logger = logger
  }

  public async save(path: string, file: Buffer): Promise<void> {
    try {
      if (await this.exists(path)) {
        this.logger.warn(`File '${path}' already exists. Overwriting...`)
      }

      await writeFile(path, file)
    } catch (error) {
      this.logger.debug(`LocalFileStorage (L23) Error Saving File`, error)
    }
  }

  public async read(path: string): Promise<ReadStream> {
    try {
      if (!(await this.exists(path))) {
        this.logger.debug(
          new FileNotFound(`LocalFileStorage (L32) File '${path}' not found`)
        )
      }
      return fs.createReadStream(path)
    } catch (error) {
      this.logger.debug(`LocalFileStorage (L38) File Not Found`, error)
    }
  }

  public async exists(filename: string): Promise<boolean> {
    try {
      // we use because async is error prone
      return fs.existsSync(filename)
    } catch (error) {
      this.logger.debug('LocalFileStorage (L47) File Not Found', error)
      return false
    }
  }

  public async delete(path: string): Promise<void> {
    try {
      if (await this.exists(path)) {
        this.logger.debug(
          new FileNotFound(`LocalFileStorage (L57) File '${path}' not found`)
        )
      }
      await unlink(path)
    } catch (error) {
      this.logger.debug(`LocalFileStorage (L63) File Not Found`, error)
    }
  }

  public createWriteStream(path: string): fs.WriteStream {
    if (fs.existsSync(path)) {
      this.logger.warn(`File '${path}' already exists. Overwriting...`)
    }
    return fs.createWriteStream(path)
  }

  public async list(path: string): Promise<string[]> {
    try {
      return await readdir(path)
    } catch (error) {
      this.logger.debug(`LocalFileStorage (L89) Error Listing Files`, error)
    }
  }

  public async count(path: string): Promise<number> {
    try {
      const files = await this.list(path)
      return files.length
    } catch (error) {
      this.logger.debug(`LocalFileStorage (L99) Error Counting Files`, error)
    }
  }
}
