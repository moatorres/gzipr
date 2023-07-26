import { HttpStatus } from '@gzipr/core'
import { server, logger } from '../../../app/server'
import { LocalFileStorage } from '../../infra'

import { DownloadUseCase } from './DownloadUseCase'
import { DownloadController } from './DownloadController'

const storage = new LocalFileStorage(logger)
const downloadUseCase = new DownloadUseCase(logger, storage)
const downloadController = new DownloadController(logger, downloadUseCase)

const downloadRouter = server.getRouter()

const downloadRouterHelp = (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message:
      'Are you trying to download a file? Try GETting /download/:filename instead.',
  })
}

downloadRouter.route('/').all(downloadRouterHelp)

downloadRouter.get('/:filename', (req, res) =>
  downloadController.execute(req, res)
)

export { downloadRouter }
