/**
 * 处理access_token以及和微信交互的逻辑
 * **/
'use strict'
const fs = require('fs')
const Promise = require('bluebird')  // node.js的Promise库
const request = Promise.promisify(require('request'))

const Wechat = function (opts) {
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken
  this.fetchAccessToken()
}

Wechat.prototype.fetchAccessToken = function () {
  
}