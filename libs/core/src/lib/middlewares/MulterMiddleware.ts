import path from 'path'
import multer, { Options as MulterOptions } from 'multer'

import { Middleware } from '../common'

export class MulterMiddleware extends Middleware<MulterOptions> {
  constructor(options?: MulterOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => MulterOptions {
    return () =>
      ({
        dest: path.join(process.cwd(), 'uploads'),
      } as MulterOptions)
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()
    return multer({ ...defaultOptions(), ...this.options }).single('file')
  }
}
