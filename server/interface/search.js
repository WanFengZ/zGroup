import Router from 'koa-router'
import axios from 'axios'
// import Poi from '../dbs/models/poi'

const router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  // const result = await Poi.find({
  //   name: new RegExp(ctx.query.input),
  //   city: ctx.query.city
  // })
  // ctx.body = {
  //   code: 0,
  //   top: result.map(item => ({
  //     name: item.name,
  //     type: item.type
  //   })),
  //   type: top.length ? top[0].type : ''
  // }
  const { status, data: { top } } = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      city: ctx.query.city
    }
  })
  ctx.body = {
    place: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  const { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/product', async (ctx) => {
  const { keyword, city } = ctx.query
  const { status, data: { product, more } } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city
    }
  })
  if (status === 200) {
    product.photos = product.photos.concat(product.photos, product.photos, product.photos, product.photos, product.photos)
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
