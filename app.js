'use strict'
const Koa = require('Koa')
const generator = require('./wechat/generator')
const config = require('./config')


const app = new Koa()
app.use(generator(config.wechat))
app.listen(8046)
console.log('正在监听8046端口..........')