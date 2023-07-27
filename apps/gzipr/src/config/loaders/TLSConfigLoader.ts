import fs from 'fs'
import path from 'path'
import { ConfigLoader } from '@gzipr/core'

/**
 * Options for {@link TLSConfigLoader}.
 */
export type TLSConfigLoaderOptions = {
  keyFilePath: string
  certFilePath: string
}

/**
 * Loads certificate and key from file system.
 */
export class TLSConfigLoader implements ConfigLoader {
  private readonly certPath: string
  private readonly keyPath: string

  constructor(o: TLSConfigLoaderOptions) {
    this.keyPath = path.resolve(process.cwd(), o.keyFilePath)
    this.certPath = path.resolve(process.cwd(), o.certFilePath)
  }

  private shouldLoadFromFile() {
    return !process.env.TLS_KEY || !process.env.TLS_CERT
  }

  public load() {
    if (this.shouldLoadFromFile()) {
      const key = fs.readFileSync(this.keyPath)
      const cert = fs.readFileSync(this.certPath)

      return {
        TLS_KEY: key.toString(),
        TLS_CERT: cert.toString(),
      }
    }

    return {
      TLS_KEY: process.env.TLS_KEY,
      TLS_CERT: process.env.TLS_CERT,
    }
  }
}
