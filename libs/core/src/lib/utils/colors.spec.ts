import * as colorModule from './colors'

describe('colors', () => {
  describe('isColorAllowed', () => {
    it('should return true if APP_COLOR_OFF is not set', () => {
      delete process.env.APP_COLOR_OFF
      expect(colorModule.isColorAllowed()).toBe(true)
    })

    it('should return false if APP_COLOR_OFF is set', () => {
      process.env.APP_COLOR_OFF = 'true'
      expect(colorModule.isColorAllowed()).toBe(false)
    })
  })

  describe('colorize', () => {
    beforeEach(() => {
      jest.spyOn(colorModule, 'isColorAllowed').mockImplementation(() => true)
    })

    afterEach(() => {
      jest.spyOn(colorModule, 'isColorAllowed').mockRestore()
    })

    it('should colorize text if isColorAllowed is true', () => {
      const red = colorModule.colorize('\x1B[31m')
      expect(red('\x1B[31mtext\x1B[39m')).toBe('\x1B[31mtext\x1B[39m')
    })

    it('should return plain text if isColorAllowed is false', () => {
      jest.spyOn(colorModule, 'isColorAllowed').mockImplementation(() => false)
      const red = colorModule.colorize('\x1B[31m')
      expect(red('text')).toBe('text')
    })
  })

  describe('system colors', () => {
    it('should always colorize text, regardless of isColorAllowed', () => {
      jest.spyOn(colorModule, 'isColorAllowed').mockImplementation(() => false)
      const { blue } = colorModule.system
      expect(blue('text')).toBe('\x1B[96mtext\x1B[39m')
    })
  })

  describe('conditional colors', () => {
    beforeEach(() => {
      jest.spyOn(colorModule, 'isColorAllowed').mockImplementation(() => true)
    })

    afterEach(() => {
      jest.spyOn(colorModule, 'isColorAllowed').mockRestore()
    })

    it('should colorize text if isColorAllowed is true', () => {
      expect(colorModule.red('\x1B[31mtext\x1B[39m')).toBe(
        '\x1B[31mtext\x1B[39m'
      )
    })

    it('should return plain text if isColorAllowed is false', () => {
      jest.spyOn(colorModule, 'isColorAllowed').mockImplementation(() => false)
      expect(colorModule.red('text')).toBe('text')
    })
  })
})
