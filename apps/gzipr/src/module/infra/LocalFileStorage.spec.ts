import { ConsoleLogger } from '@gzipr/core'
import { LocalFileStorage } from './LocalFileStorage'

const logger = new ConsoleLogger()

describe('LocalFileStorage', () => {
  let storage: LocalFileStorage

  beforeEach(() => {
    storage = new LocalFileStorage(logger)
  })

  describe('save', () => {
    it('should save a file', async () => {
      const filename = 'test.txt'
      const file = Buffer.from('test')

      await storage.save(filename, file)
      const exists = await storage.exists(filename)
      expect(exists).toBeTruthy()
    })
  })

  describe('exists', () => {
    it('should check if a file exists', async () => {
      const filename = 'test.txt'
      const file = Buffer.from('test')

      await storage.save(filename, file)
      const exists = await storage.exists(filename)
      expect(exists).toBeTruthy()
    })
  })

  describe('read', () => {
    it('should read a file', async () => {
      const filename = 'test.txt'
      const file = Buffer.from('test')

      await storage.save(filename, file)
      const exists = await storage.exists(filename)
      expect(exists).toBeTruthy()
    })
  })

  describe('delete', () => {
    it('should delete a file', async () => {
      const filename = 'test.txt'
      const file = Buffer.from('test')

      await storage.save(filename, file)
      const exists = await storage.exists(filename)
      expect(exists).toBeTruthy()

      await storage.delete(filename)
      const exists2 = await storage.exists(filename)
      expect(exists2).toBeFalsy()
    })
  })
})
