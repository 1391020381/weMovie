/**
 * 配置文件
 * **/
'use strict'
const path = require('path')
const util = require('./libs/util')
const wechat_file = path.join(__dirname, './config/wechat.txt')

const config = {
  wechat: {
    appID: 'wx3bfdfb708b8a935e',
    appSecret: 'e12f5bda975b0b4fa0b63d723fdbeb30',
    token: 'justdoit',
    getAccessToken: function () {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function (data) {
      return util.writeFileAsync(wechat_file, data)
    }
  }
}