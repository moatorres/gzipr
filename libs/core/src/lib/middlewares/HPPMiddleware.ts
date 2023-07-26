import hpp, { Options as HPPOptions } from 'hpp'
import { Middleware } from '../common'

export class HPPMiddleware extends Middleware<HPPOptions> {
  constructor(options?: HPPOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => HPPOptions {
    return () => ({} as HPPOptions)
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()
    return hpp({ ...defaultOptions(), ...this.options })
  }
}
