const { getEntries } = require('./utils/getEntries')
const { getKeys }    = require('./utils/getKeys')

const CustomObject = class CustomObject {}

CustomObject.getEntries = getEntries
CustomObject.getKeys    = getKeys

module.exports.Object = CustomObject
