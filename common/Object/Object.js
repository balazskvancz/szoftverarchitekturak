const { getEntries } = require('./utils/getEntries')

const CustomObject = class CustomObject {}

CustomObject.getEntries = getEntries

CustomObject.defineProperties = Object.defineProperties
CustomObject.defineProperty   = Object.defineProperty
CustomObject.assign           = Object.assign

module.exports.Object = CustomObject
