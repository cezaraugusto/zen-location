import {expect, test, describe} from 'vitest'

import zenLocation, {getInstallGuidance} from '../src/index'

describe('zen-location module', () => {
  it('returns string or null', () => {
    const res = zenLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Zen Browser for Testing (recommended)',
          command: 'npx extension install zen'
        },
        {
          summary: 'Install Zen Browser',
          command: 'npx extension install zen-stable'
        }
      ]
    })

    expect(msg).toMatch(
      new RegExp(
        '1\\) Install Zen Browser for Testing \\(recommended\\)\\n' +
          ' {3}npx extension install zen'
      )
    )
    expect(msg).toMatch(
      /2\) Install Zen Browser\n {3}npx extension install zen-stable/
    )
    expect(msg).not.toMatch(/Install Zen Browser from the official site/)
    expect(msg).toMatch(/We couldn't find a Zen Browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
