import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
  // preset: 'ts-jest/presets/js-with-ts',
  // globals: {
  //   'ts-jest': {
  //     tsConfig: 'tsconfig.json',
  //     diagnostics: false
  //   }
  // }
}
export default config
