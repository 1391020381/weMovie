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
const tpl = require('./tpl')
exports.parseXMLAsync = function (xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, {trim: true}, function (err, content) {
      err ? reject(err) : resolve(content)
    })
  })
}

function formatMessage (result) {   // 把xml2js解析后的数据
  var message = {};
  if (typeof result === 'object') {
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var item = result[key];
      if (!(item instanceof Array) || item.length === 0) continue;
      if (item.length === 1) {
        var val = item[0];
        if (typeof val === 'object') message[key] = formatMessage(val);
        else message[key] = (val || '').trim();
      } else {
        message[key] = [];
        for (var j = 0, k = item.length; j < k; j++) message[key].push(formatMessage(item[j]));
      }
    }
  }
  return message;

}

exports.formatMessage = formatMessage
exports.tpl = function (content, message) {  // 获得 formatMessage 处理后的数据,并通过 tpl模板编译
  let info = {}
  let type = 'text'
  let formUserName = message.FormUserName
  let toUserName = message.ToUserName
  if (Array.isArray(content)) {
    type = 'news'
  }
  type = content.type || type
  info.content = content
  info.createTime = new Date().getTime()
  info.msgType = type
  info.formUserName = toUserName
  info.toUserName = formUserName

  return tpl.compiled(info)
}