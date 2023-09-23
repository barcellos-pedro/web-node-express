const environment = process.env.NODE_ENV || "development"
const credentials = require(`./.credentials.${environment}`)

module.exports = credentials
