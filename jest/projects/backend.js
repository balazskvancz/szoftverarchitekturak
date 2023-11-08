const path = require('path')

const common = require('./common')

const globals = require('../globals/globals')

const config = {
  ...common,
  rootDir: path.resolve(__dirname, '..', '..'),
  displayName: 'node',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/backend/**/*.test.ts'
  ],
  globals: {
    ...globals
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/common/'
  ]
}

module.exports = config
