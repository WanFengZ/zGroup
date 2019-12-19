import Router from 'koa-router'
import axios from 'axios'
// import Menu from '../dbs/models/menu'
// import Province from '../dbs/models/province'
// import City from '../dbs/models/city'
const router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async (ctx) => {
  if (ctx.session.position) {
    ctx.body = {
      province: ctx.session.position.province,
      city: ctx.session.position.city
    }
    return
  }

  const { status, data: position } = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200) {
    ctx.body = position
    ctx.session.position = position
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.post('/changePosition', (ctx) => {
  const { position } = ctx.request.body
  try {
    ctx.session.position = position
    ctx.body = {
      code: 0
    }
  } catch (err) {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  const { status, data: { menu } } = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu
    }
  }
})

router.get('/province', async (ctx) => {
  // const province = await Province.find()
  // ctx.body = {
  //   province: province.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.value
  //     }
  //   })
  // }
  const { status, data: { province } } = await axios.get('http://cp-tools.cn/geo/province')
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id/city', async (ctx) => {
  // const city = await City.findOne({ id: ctx.params.id })
  // ctx.body = {
  //   code: 0,
  //   city: city.value
  // }
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  ctx.body = {
    city: status === 200 ? city : []
  }
})

router.get('/city', async (ctx) => {
  // let city = []
  // const result = await City.find()
  // result.forEach((item) => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   city: city.map((item) => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
  //     }
  //   })
  // }
  const { status, data: { city } } = await axios.get('http://cp-tools.cn/geo/city')
  ctx.body = {
    city: status === 200 ? city : []
  }
})

router.get('/hotCity', async (ctx) => {
  const { status, data: { hots } } = await axios.get('http://cp-tools.cn/geo/hotCity')
  ctx.body = {
    hots: status === 200 ? hots : []
  }
})

export default router
