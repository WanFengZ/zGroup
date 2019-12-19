import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'

const router = new Router({
  prefix: '/order'
})

router.post('/createOrder', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const { id, count } = ctx.request.body
    const time = new Date()
    const user = ctx.session.passport.user.username
    const orderId = md5(Math.random() * 1000 + time.toLocaleString() + user).toString()

    const cart = await Cart.findOne({ cartNo: id })

    if (!cart.goodsDetail.name) {
      ctx.body = {
        code: -1,
        msg: 'not found cart'
      }
    } else {
      cart.goodsDetail.count = count
      const detail = cart.goodsDetail
      const result = await Order.create({
        orderId,
        total: count * detail.price,
        status: 0,
        detail,
        user,
        time
      })
      if (result.orderId) {
        cart.remove()
        ctx.body = {
          code: 0,
          id: result.orderId
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'save fail'
        }
      }
    }
  }
})

router.post('/getOrder', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const user = ctx.session.passport.user.username
    const orders = await Order.find({ user })
    if (orders) {
      ctx.body = {
        code: 0,
        orders
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'not found'
      }
    }
  }
})

export default router
