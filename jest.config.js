/**
 * @link {https://jestjs.io/docs/configuration}
 */
const config = {
  // https://jestjs.io/docs/en/configuration#projects-arraystring--projectconfig
  projects: [
    require('./jest/projects/common'),
    require('./jest/projects/backend')
  ]
}

module.exports = config
