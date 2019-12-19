import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'

const router = new Router({
  prefix: '/cart'
})

router.post('/createCart', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = new Date()
    const user = ctx.session.passport.user
    const cartNo = md5(Math.random() * 1000 + time.toLocaleString() + user.username).toString()
    const { goodsId, goodsDetail } = ctx.request.body
    const result = await Cart.create({
      cartNo,
      goodsId,
      goodsDetail,
      time,
      user: user.username
    })
    if (result.cartNo) {
      ctx.body = {
        code: 0,
        id: result.cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'save fail'
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const result = await Cart.findOne({
      cartNo: ctx.request.body.id
    })
    if (result && result.user && result.user === ctx.session.passport.user.username) {
      ctx.body = {
        code: 0,
        detail: result.goodsDetail
      }
    } else {
      ctx.body = {
        code: -1,
        detail: {},
        msg: 'not found'
      }
    }
  }
})

export default router
