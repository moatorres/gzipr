import { HttpStatus } from '@gzipr/core'
import { server, logger } from '../../../app/server'
import { LocalFileStorage } from '../../infra'
import { FileUploadService } from '../../services'

import { UploadUseCase } from './UploadUseCase'
import { UploadController } from './UploadController'

const storage = new LocalFileStorage(logger)
const fileUploadService = new FileUploadService(logger, storage)
const uploadUseCase = new UploadUseCase(logger, fileUploadService)
const uploadController = new UploadController(logger, uploadUseCase)

const uploadRouter = server.getRouter()

const uploadRouterHelp = (_, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message:
      'Are you trying to upload a file? Try POSTing to /upload/:filename instead.',
  })
}

uploadRouter.route('/').all(uploadRouterHelp)

uploadRouter.post('/:filename', (req, res) =>
  uploadController.execute(req, res)
)

export { uploadRouter }
