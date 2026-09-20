#!/usr/bin/env node

'use strict'

const api = require('./dist/index.cjs')

const locateZen = api.default || api
const {getZenVersion} = api
const {getInstallGuidance} = api

const argv = process.argv.slice(2)
const allowFallback = argv.includes('--fallback') || argv.includes('-f')
const printBrowserVersion =
  argv.includes('--zen-version') || argv.includes('--browser-version')

const allowExec = argv.includes('--allow-exec')

try {
  const zenPath =
    (typeof locateZen === 'function' && locateZen(allowFallback)) ||
    (typeof locateZen === 'function' && locateZen(true)) ||
    null

  if (!zenPath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Zen Browser not found.'

    console.error(guidance)
    process.exit(1)
  }

  if (printBrowserVersion && typeof getZenVersion === 'function') {
    const v = getZenVersion(zenPath, {allowExec})

    if (!v) {
      console.log('')
      process.exit(2)
    }

    console.log(String(v))
    process.exit(0)
  }

  console.log(String(zenPath))
} catch (e) {
  console.error(String(e?.message ? e.message : e))
  process.exit(1)
}
