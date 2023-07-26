import helmet from 'helmet'
import type { HelmetOptions } from 'helmet'
import { Middleware } from '../common'

export class HelmetMiddleware extends Middleware<HelmetOptions> {
  constructor(options?: HelmetOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => Partial<HelmetOptions> {
    return () => ({
      noSniff: true,
    })
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()
    return helmet({
      ...defaultOptions(),
      ...this.options,
    } as Readonly<HelmetOptions>)
  }
}
