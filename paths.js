/* eslint-disable no-undef */
const path = require('path')

// --- TYPESCRIPT

const tsPaths = {
  '@common/*': [
    'common/*'
  ],
  '@backend/*': [
    'backend/*'
  ],
  '@authService/*': [
    'backend/authService/*'
  ],
  '@distributorService/*': [
    'backend/distributorService/*'
  ],
  '@packageService/*': [
    'backend/packageService/*'
  ],
  '@userService/*': [
    'backend/userService/*'
  ],
  '@frontend/*': [
    'frontend/*'
  ]
}

module.exports.tsPaths = tsPaths

// --- WEBPACK

const webpackPaths = {
  '@common': path.resolve(__dirname, 'common'),
  '@backend': path.resolve(__dirname, 'backend'),
  '@authService': path.resolve(__dirname, 'backend', 'authService'),
  '@distributorService': path.resolve(__dirname, 'backend', 'distributorService'),
  '@packageService': path.resolve(__dirname, 'backend', 'packageService'),
  '@userService': path.resolve(__dirname, 'backend', 'userService'),
  '@frontend': path.resolve(__dirname, 'frontend')
}

module.exports.webpackPaths = webpackPaths

// --- JEST

const jestPaths = {
  '^@backend(.*)$': '<rootDir>backend$1',
  '^@common(.*)$': '<rootDir>common$1'
}

module.exports.jestPaths = jestPaths

// --- NODE

const nodePaths = {}

module.exports.nodePaths = nodePaths

nodePaths.root = path.resolve()
nodePaths.dist = path.resolve(__dirname, 'dist')
nodePaths.webpack = path.resolve(__dirname, 'webpack')
