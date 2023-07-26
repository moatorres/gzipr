import fs from 'fs'
import path from 'path'
import { ConfigLoader } from '@gzipr/core'

/**
 * Get config from json file.
 */
export class JsonConfigLoader implements ConfigLoader {
  constructor(private readonly filePath: string = 'config.json') {
    this.filePath = path.resolve(process.cwd(), filePath)
  }

  public load<T extends object = any>() {
    if (fs.existsSync(this.filePath)) {
      return JSON.parse(fs.readFileSync(this.filePath).toString()) as T
    }
    return {} as T
  }
}
