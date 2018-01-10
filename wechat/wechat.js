/**
 * 处理access_token以及和微信交互的逻辑
 * **/
'use strict'
const fs = require('fs')
const Promise = require('bluebird')  // node.js的Promise库
const request = Promise.promisify(require('request'))

const prefix = 'https://api.weixin.qq.com/cgi-bin/'

const api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}

function Wechat (opts) {
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken
  this.fetchAccessToken()
}

// access_token——start
Wechat.prototype.fetchAccessToken = function () {
  var that = this
  if (this.access_token && this.expires_in) { // 第一次获取access_token 时 Wechat构造函数中没有access_token 和expires_in ,此属性是在 fetchAccessToken中赋值的
    if (this.isvalidAccessToken(this)) {
      return Promise.resolve(this)
    }
  }
  this.getAccessToken().then(function (data) {
    try {
      data = JSON.parse(data)
    } catch (e) {
      return that.updateAccessToken()
    }
    if (that.isvalidAccessToken(data)) {
      return Promise.resolve(data)
    } else {
      return that.updateAccessToken()
    }
  }).then(data => {
    that.access_token = data.access_token
    that.expires_in = data.expires_in
    that.saveAccessToken(JSON.stringify(data))
    return Promise.resolve(data)
  })

}
Wechat.prototype.isvalidAccessToken = function (data) {
  if (!data || !data.access_token || !data.expires_in) return false
  const access_token = data.access_token
  const expires_in = data.expires_in
  var now = new Date().getTime()
  return (now < expires_in) ? true : false
}
Wechat.prototype.updateAccessToken = function () {
  const appID = this.appID
  const appSecret = this.appSecret
  const url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`
  return new Promise(function (resolve, reject) {
    request({url: url, json: true}).then(function (response) {
      let data = response.body
      let now = new Date().getTime()
      let expires_in = now + (data.expires_in - 20) * 1000    // 注意微信后台返回的 expires_in是以秒为单位
      data.expires_in = expires_in
      resolve(data)
    })
  })
}
// access_token——end

// 回复——start

Wechat.prototype.replay = function () {

}
// 回复——end
module.exports = Wechat