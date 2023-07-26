import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { ConfigLoader } from '@gzipr/core'

/**
 * Get config from dotenv file.
 */
export class DotenvConfigLoader implements ConfigLoader {
  constructor(private readonly filePath: string = '.env') {
    this.filePath = path.resolve(process.cwd(), filePath)
  }

  load() {
    const result = dotenv.config({ path: this.filePath })

    if (result.parsed) {
      return result.parsed
    }

    if (fs.existsSync(this.filePath)) {
      const loaded = dotenv.parse(fs.readFileSync(this.filePath))
      return loaded
    }
  }
}
