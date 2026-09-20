import {afterEach, describe, expect, it, vi} from 'vitest'

/* Biome-ignore-all lint/suspicious/noExplicitAny: test harness uses dynamic imports with untyped injected deps */

describe('zen-location scanners', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetModules()
  })

  it('macOS: finds Zen.app in /Applications', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any
    const found = scanOsxPath(false, {
      fs: {existsSync: (p: string) => p.includes('Zen.app')},
      userhome: () => '/Users/test/Applications'
    })

    expect(found).toBe('/Applications/Zen.app/Contents/MacOS/zen')
  })

  it('macOS: finds the legacy Zen Browser.app only with the fallback', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any
    const onlyLegacy = {existsSync: (p: string) => p.includes('Zen Browser.app')}
    const userhome = () => '/Users/test/Applications'

    expect(scanOsxPath(false, {fs: onlyLegacy, userhome})).toBe(null)
    expect(scanOsxPath(true, {fs: onlyLegacy, userhome})).toBe(
      '/Applications/Zen Browser.app/Contents/MacOS/zen'
    )
  })

  it('macOS: checks the user Applications directory too', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any
    const found = scanOsxPath(false, {
      fs: {existsSync: (p: string) => p.startsWith('/Users/test/Applications')},
      userhome: () => '/Users/test/Applications'
    })

    expect(
      typeof found === 'string' && found.startsWith('/Users/test/Applications')
    ).toBe(true)
  })

  it('macOS: returns null when not installed', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path')).default as any

    expect(
      scanOsxPath(false, {
        fs: {existsSync: () => false},
        userhome: () => '/Users/test/Applications'
      })
    ).toBeNull()
  })

  it('Windows: finds zen.exe under a known prefix', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any
    const found = scanWindowsPath(false, {
      fs: {existsSync: (p: string) => /zen\.exe$/i.test(p)},
      env: {LOCALAPPDATA: 'C:\\Local'} as any
    })

    expect(typeof found === 'string' && /zen\.exe$/i.test(found)).toBe(
      true
    )
  })

  it('Windows: returns null when not installed', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as any

    expect(
      scanWindowsPath(false, {
        fs: {existsSync: () => false},
        env: {LOCALAPPDATA: 'C:\\Local'} as any
      })
    ).toBeNull()
  })

  it('Linux/other: resolves zen via which', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any
    const found = scanUnknown(false, {
      which: {
        sync: (cmd: string) => {
          if (cmd === 'zen') return '/usr/bin/zen'
          throw new Error('not found')
        }
      }
    })

    expect(found).toBe('/usr/bin/zen')
  })

  it('Linux/other: returns null when which finds nothing', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as any

    expect(
      scanUnknown(false, {
        which: {
          sync: () => {
            throw new Error('not found')
          }
        }
      })
    ).toBeNull()
  })
})
