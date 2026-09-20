[npm-version-image]: https://img.shields.io/npm/v/zen-location.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/zen-location
[npm-downloads-image]: https://img.shields.io/npm/dm/zen-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/zen-location
[action-image]: https://github.com/cezaraugusto/zen-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/zen-location/actions
[npm-provenance-image]: https://img.shields.io/badge/provenance-verified-0971fe?logo=npm&logoColor=white
[npm-provenance-url]: https://www.npmjs.com/package/zen-location

> Approximates the current location of the Zen Browser across platforms.

# zen-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url] [![Provenance][npm-provenance-image]][npm-provenance-url]


- By default checks only `stable`.
- Supports macOS / Windows / Linux
- Works both as an ES module or CommonJS

## Installation

```bash
npm i zen-location
```

## Support table

This table lists the default locations where Zen Browser is typically installed for each supported platform and channel. By default, only the Stable channel is checked.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Zen Browser (Stable)</td>
      <td>
        <ul>
          <li><code>/Applications/Zen Browser.app/Contents/MacOS/Zen Browser</code></li>
          <li><code>~/Applications/Zen Browser.app/Contents/MacOS/Zen Browser</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Zen Browser (Stable)</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Zen Browser\zen.exe</code></li>
          <li><code>%PROGRAMFILES%\Zen Browser\zen.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Zen Browser\zen.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Zen Browser (Stable)</td>
      <td>
        <ul>
          <li><code>zen</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## Usage

**Via Node.js (strict by default):**

```js
import zenLocation from 'zen-location'
import {
  locateZenOrExplain,
  getInstallGuidance,
  getZenVersion
} from 'zen-location'

// Strict (Stable only)
console.log(zenLocation())
// => "/Applications/Zen Browser.app/Contents/MacOS/Zen Browser" or null

// Throw with an install guide when not found
try {
  const bin = locateZenOrExplain({allowFallback: true})
  console.log(bin)

  // Cross-platform version (no exec by default)
  console.log(getZenVersion(bin)) // e.g. "128.0" or null

  // Opt-in: allow executing the binary (Linux/other)
  console.log(getZenVersion(bin, {allowExec: true}))
} catch (e) {
  console.error(String(e))
  // Or print getInstallGuidance() explicitly
}
```

**CommonJS:**

```js
const api = require('zen-location')
const locateZen = api.default || api
```

**Via CLI:**

```bash
npx zen-location

# Respect environment overrides
ZEN_BINARY=/custom/path/to/zen npx zen-location

# Print browser version (empty + exit code 2 if unavailable)
npx zen-location --zen-version
npx zen-location --browser-version

# Opt-in: allow executing the binary to fetch version
npx zen-location --browser-version --allow-exec
```

### Environment overrides

If this environment variable is set and points to an existing binary, it takes precedence:

- `ZEN_BINARY`

## API

- `default export locateZen(allowFallback?: boolean): string | null`
- `locateZenOrExplain(options?: boolean | { allowFallback?: boolean }): string`
- `getZenVersion(bin: string, opts?: { allowExec?: boolean }): string | null`
- `getInstallGuidance(): string`

## Related projects

- [brave-location](https://github.com/cezaraugusto/brave-location)
- [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
- [chromium-location](https://github.com/cezaraugusto/chromium-location)
- [edge-location](https://github.com/cezaraugusto/edge-location)
- [firefox-location2](https://github.com/cezaraugusto/firefox-location2)
- [safari-location2](https://github.com/cezaraugusto/safari-location2)
- [opera-location2](https://github.com/cezaraugusto/opera-location2)
- [vivaldi-location2](https://github.com/cezaraugusto/vivaldi-location2)
- [waterfox-location](https://github.com/cezaraugusto/waterfox-location)
- [yandex-location](https://github.com/cezaraugusto/yandex-location)

## License

MIT (c) Cezar Augusto.


