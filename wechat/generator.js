const sha1 = require('sha1')
const Wechat = require('./wechat')
module.exports = function (opts) {
  let wechat = new Wechat(opts)
  return function async (ctx, next) {
    // ctx.query = {
    //   "signature": "863b0ff4eb36110890df31dde43af670911d72f2",
    //   "echostr": "17959041094670295038",
    //   "timestamp": "1515394186",
    //   "nonce": "3136634053"
    // }
    const token = opts.token
    const signature = ctx.query.signature
    const nonce = ctx.query.nonce
    const timestamp = ctx.query.timestamp
    const echostr = ctx.query.echostr
    const str = [token, timestamp, nonce].sort().join('') // 按字典排序,拼接字符串
    const sha = sha1(str)
    console.log(sha, signature)
    ctx.body = (sha === signature) ? echostr + '' : 'failed' // 比较并返回结果
  }
}