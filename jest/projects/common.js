const path = require('path')

const common    = require('../configs/common')
const globals   = require('../globals/globals')

// https://jestjs.io/docs/configuration
module.exports = {
  ...common,
  rootDir: path.resolve(__dirname, '..', '..'),
  displayName: 'common',
  testMatch: [
    '<rootDir>/common/**/*.test.ts'
  ],
  globals: {
    ...globals
  },
  modulePathIgnorePatterns: [],
  coveragePathIgnorePatterns: [
    '<rootDir>/backend/'
  ]
}
