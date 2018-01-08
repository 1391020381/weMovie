'use strict'
const fs = require('fs')
const Promise = require('bluebird')

exports.readFileAsync = function (fpath, encoding) {
  return new Promise(function (resolve, reject) {
    fs.readFileAsync(fpath, encoding, function (err, content) {
      if (err) reject(err)
      else resolve(content)
    })
  })
}
exports.writeFileAsync = function (fapth, encoding) {
  return new Promise(function (resolve, reject) {
    fs.writeFileAsync(fapth, encoding, function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}