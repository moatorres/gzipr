import fs from 'fs'

import { ConsoleLogger } from '@gzipr/core'
import { LocalFileStorage } from '../../infra/LocalFileStorage'
import { DownloadUseCase } from './DownloadUseCase'

const logger = new ConsoleLogger()
const localStorage = new LocalFileStorage(logger)

describe('DownloadUseCase', () => {
  beforeAll(() => {
    fs.writeFileSync('filename.txt', 'test')
  })

  afterAll(() => {
    fs.unlinkSync('filename.txt')
  })

  it('should return left when filename is not provided', async () => {
    const useCase = new DownloadUseCase(logger, localStorage)
    const result = await useCase.execute({ filename: '' })
    expect(result.isLeft()).toBeTruthy()
  })

  it('should return left if a file is not found', async () => {
    const useCase = new DownloadUseCase(logger, localStorage)
    const result = await useCase.execute({ filename: 'not-found.txt' })
    expect(result.isLeft()).toBeTruthy()
  })

  xit('should return right when storage returns a stream', async () => {
    const useCase = new DownloadUseCase(logger, localStorage)
    const result = await useCase.execute({ filename: 'filename.txt' })
    expect(result.isRight()).toBeTruthy()
  })

  xit('should return a readable stream when storage returns a stream', async () => {
    const useCase = new DownloadUseCase(logger, localStorage)
    const result = await useCase.execute({ filename: 'filename.txt' })
    expect(result.isRight()).toBeTruthy()
  })
})
