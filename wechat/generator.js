/**
 * 中间件
 * 对请求类型进行判断,实现逻辑分离
 * 一般情况下是,只有access_token的认证是GET请求K,其他的是POST请求。
 * **/

  // ctx.query = {
  //   "signature": "863b0ff4eb36110890df31dde43af670911d72f2",
  //   "echostr": "17959041094670295038",
  //   "timestamp": "1515394186",
  //   "nonce": "3136634053"
  // }
const sha1 = require('sha1')
const rawBody = require('raw-body')
const Wechat = require('./wechat')
const util = require('./util')
module.exports = function (opts) {
  let wechat = new Wechat(opts)
  return async function (ctx, next) {
    const token = opts.token
    const signature = ctx.query.signature
    const nonce = ctx.query.nonce
    const timestamp = ctx.query.timestamp
    const echostr = ctx.query.echostr
    const str = [token, timestamp, nonce].sort().join('') // 按字典排序,拼接字符串
    const sha = sha1(str)
    console.log(sha, signature)

    if (ctx.method === 'GET') {
      ctx.body = (sha === signature) ? echostr + '' : 'failed' // 比较并返回结果
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'failed'
        return false
      }
      let data = await rawBody(ctx.request, {length: ctx.length, limit: '1mb', encoding: ctx.charset})
      let content = await  util.parseXMLAsync(content.xml)
    }
  }
}