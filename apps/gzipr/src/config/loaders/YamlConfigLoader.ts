import fs from 'fs'
import path from 'path'
import { ConfigLoader } from '@gzipr/core'

/**
 * Get config from a yaml file.
 */
export class YamlConfigLoader implements ConfigLoader {
  constructor(private readonly filePath: string = 'config.yaml') {
    this.filePath = path.resolve(process.cwd(), filePath)
  }

  async load() {
    if (fs.existsSync(this.filePath)) {
      const yaml = (await import('js-yaml')).default
      return yaml.load(fs.readFileSync(this.filePath).toString()) as Record<
        string,
        string
      >
    }
    return {}
  }
}
