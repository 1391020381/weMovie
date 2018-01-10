'use strict'
const Koa = require('Koa')
const generator = require('./wechat/generator')
const config = require('./config')
const weixin = require('./weixin')


const app = new Koa()
app.use(generator(config.wechat, weixin.reply))   // handler
app.use(weixin.setMenu)
app.listen(8046)
console.log('正在监听8046端口..........')