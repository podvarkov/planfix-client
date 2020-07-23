const errors = require('./errors.json')

module.exports = function (res) {
  if (res.$.status !== 'ok') {
    const err = new Error()
    err.message = 'Planfix error: ' + res.message
    err.code = res.code
    err.statusCode = 400
    err.description = errors[res.code]
    throw err
  }
  
  return res
}
