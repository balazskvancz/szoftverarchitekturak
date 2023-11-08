const { jestPaths, tsPaths } = require('../../paths')

module.exports = {
  // https://jestjs.io/docs/next/code-transformation
  transform: {
    '^.+\\.tsx?$': [
      // https://kulshekhar.github.io/ts-jest/
      'ts-jest',
      {
        // Ettől működik teszteléskor a typechecking.
        // Viszont hatalmas különbség van tesztfuttatásnál.
        // false -> VAN   check
        // true  -> NINCS check
        isolatedModules: true,

        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
        tsconfig: {
          paths: tsPaths,
          target: 'es2017'
        },

        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
        // https://huafu.github.io/ts-jest/user/config/diagnostics
        diagnostics: {
          // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json
          ignoreCodes: [
            2451, // Cannot redeclare block-scoped variable
            5056  // Cannot write file '$$ts-jest$$/apps/Tween/tween.js' because it would be overwritten by multiple input files.
          ]
        }
      }
    ]
  },

  setupFiles: [
    // empty.
  ],

  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'json', 'svelte'
  ],

  setupFilesAfterEnv: [
    'jest-extended/all'
  ],

  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '/vendors/'
  ],

  // https://jestjs.io/docs/en/configuration.html#coveragepathignorepatterns-arraystring
  coveragePathIgnorePatterns: [
    // 3rd party nem érdekel
    '/node_modules/'
  ],

  moduleNameMapper: jestPaths
}
