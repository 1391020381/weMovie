'use strict'
const Koa = require('Koa')
const sha1 = require('sha1')
const config = {
  wechat: {
    appID: 'wx3bfdfb708b8a935e',
    appSecret: 'e12f5bda975b0b4fa0b63d723fdbeb30',
    token: 'justdoit'
  }
}
const app = new Koa()
app.use(async (ctx, next) => {
  console.log(JSON.stringify(ctx.query))
  // ctx.query = {
  //   "signature": "863b0ff4eb36110890df31dde43af670911d72f2",
  //   "echostr": "17959041094670295038",
  //   "timestamp": "1515394186",
  //   "nonce": "3136634053"
  // }
  const token = config.wechat.token
  const signature = ctx.query.signature
  const nonce = ctx.query.nonce
  const timestamp = ctx.query.timestamp
  const echostr = ctx.query.echostr
  const str = [token, timestamp, nonce].sort().join('') // 按字典排序,拼接字符串
  const sha = sha1(str)
  console.log(sha, signature)
  ctx.body = (sha === signature) ? echostr + '' : 'failed' // 比较并返回结果
})
app.listen(8046)
console.log('正在监听1352端口..........')