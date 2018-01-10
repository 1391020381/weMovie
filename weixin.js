/**
 * 处理weixin业务逻辑
 * reply、支付、错误消息的通知等
 * **/

'use strict'

const config = require('./config')
const Wechat = require('./wechat/wechat')
const menu = require('./menu')


const wechatApi = new Wechat(config.wechat)  // 获得wechat上的一些方法
// 回复

exports.reply = async function (next) {

}

// 设置菜单
exports.setMenu = async function (next) {

}