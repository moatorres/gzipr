import {
  isColorAllowed,
  colorize,
  system,
  bold,
  red,
  bgRed,
  yellow,
  bgYellow,
  green,
  bgGreen,
  magenta,
  bgMagenta,
  cyan,
  bgCyan,
  blue,
  bgBlue,
  white,
  bgWhite,
  gray,
  bgGray,
  black,
  bgBlack,
} from './colors'

describe('isColorAllowed', () => {
  it('should return true if the APP_COLOR_OFF environment variable is not set', () => {
    delete process.env['APP_COLOR_OFF']
    expect(isColorAllowed()).toBe(true)
  })

  it('should return false if the APP_COLOR_OFF environment variable is set', () => {
    process.env['APP_COLOR_OFF'] = '1'
    expect(isColorAllowed()).toBe(false)
  })
})

describe('colorize', () => {
  it('should return a function that colorises text conditionally', () => {
    const code = '\x1B[31m'
    const colorizer = colorize(code)
    expect(typeof colorizer).toBe('function')
    expect(colorizer('test')).toBe('\x1B[31mtest\x1B[39m')
  })

  it('should not colorise text if the APP_COLOR_OFF environment variable is set', () => {
    process.env['APP_COLOR_OFF'] = '1'
    const code = '\x1B[31m'
    const colorizer = colorize(code)
    expect(colorizer('test')).toBe('test')
  })
})

describe('system', () => {
  it('should colorise text unconditionally', () => {
    expect(system.blue('test')).toBe('\x1B[96mtest\x1B[39m')
    expect(system.green('test')).toBe('\x1B[32mtest\x1B[39m')
    expect(system.yellow('test')).toBe('\x1B[38;5;3mtest\x1B[39m')
    expect(system.red('test')).toBe('\x1B[91mtest\x1B[39m')
  })
})

describe('bold', () => {
  it('should colorise text conditionally and make it bold', () => {
    expect(bold('test')).toBe('\x1B[1mtest\x1B[39m')
  })
})

describe('red', () => {
  it('should colorise text conditionally with red', () => {
    expect(red('test')).toBe('\x1B[31mtest\x1B[39m')
  })
})

describe('bgRed', () => {
  it('should colorise text conditionally with red background', () => {
    expect(bgRed('test')).toBe('\x1B[41mtest\x1B[39m')
  })
})

describe('yellow', () => {
  it('should colorise text conditionally with yellow', () => {
    expect(yellow('test')).toBe('\x1B[38;5;3mtest\x1B[39m')
  })
})

describe('bgYellow', () => {
  it('should colorise text conditionally with yellow background', () => {
    expect(bgYellow('test')).toBe('\x1B[43mtest\x1B[39m')
  })
})

describe('green', () => {
  it('should colorise text conditionally with green', () => {
    expect(green('test')).toBe('\x1B[32mtest\x1B[39m')
  })
})

describe('bgGreen', () => {
  it('should colorise text conditionally with green background', () => {
    expect(bgGreen('test')).toBe('\x1B[42mtest\x1B[39m')
  })
})

describe('magenta', () => {
  it('should colorise text conditionally with magenta', () => {
    expect(magenta('test')).toBe('\x1B[95mtest\x1B[39m')
  })
})

describe('bgMagenta', () => {
  it('should colorise text conditionally with magenta background', () => {
    expect(bgMagenta('test')).toBe('\x1B[45mtest\x1B[39m')
  })
})

describe('cyan', () => {
  it('should colorise text conditionally with cyan', () => {
    expect(cyan('test')).toBe('\x1B[96mtest\x1B[39m')
  })
})

describe('bgCyan', () => {
  it('should colorise text conditionally with cyan background', () => {
    expect(bgCyan('test')).toBe('\x1B[46mtest\x1B[39m')
  })
})

describe('blue', () => {
  it('should colorise text conditionally with blue', () => {
    expect(blue('test')).toBe('\x1B[34mtest\x1B[39m')
  })
})

describe('bgBlue', () => {
  it('should colorise text conditionally with blue background', () => {
    expect(bgBlue('test')).toBe('\x1B[44mtest\x1B[49m')
  })
})

describe('white', () => {
  it('should colorise text conditionally with white', () => {
    expect(white('test')).toBe('\x1B[37mtest\x1B[39m')
  })
})

describe('bgWhite', () => {
  it('should colorise text conditionally with white background', () => {
    expect(bgWhite('test')).toBe('\x1B[47mtest\x1B[49m')
  })
})

describe('gray', () => {
  it('should colorise text conditionally with gray', () => {
    expect(gray('test')).toBe('\x1B[90mtest\x1B[39m')
  })
})

describe('bgGray', () => {
  it('should colorise text conditionally with gray background', () => {
    expect(bgGray('test')).toBe('\x1B[100mtest\x1B[49m')
  })
})

describe('black', () => {
  it('should colorise text conditionally with black', () => {
    expect(black('test')).toBe('\x1B[30mtest\x1B[39m')
  })
})

describe('bgBlack', () => {
  it('should colorise text conditionally with black background', () => {
    expect(bgBlack('test')).toBe('\x1B[40mtest\x1B[49m')
  })
})
