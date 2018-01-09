/**
 * 工具文件
 * 解析xml
 *
 * 处理POST类型的控制逻辑,接受xml数据包
 * 解析数据包,获取数据包的消息类型或数据类型
 * 拼装自定义的消息
 * 包装成xml风格
 * 在5秒内返回消息
 * **/
// 会在generator.js中处理微信后台的数据，这里是从第二部开始
'use strict'
const xml2js = require('xml2js')
const Promise = require('bluebird')  // node.js的Promise库

exports.parseXMLAsync = function (xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, {trim: true}, function (err, content) {
      err ? reject(err) : resolve(content)
    })
  })
}
exports.formatMessage = function (result) {
  
}