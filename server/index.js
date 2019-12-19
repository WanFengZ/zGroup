import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

import mongoose from 'mongoose'
import Redis from 'koa-redis'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import usersRouter from './interface/users'
import geoRouter from './interface/geo'
import searchRouter from './interface/search'
import categoryRouter from './interface/category'
import cartRouter from './interface/cart'
import orderRouter from './interface/order'

const app = new Koa()

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt-uid',
  store: new Redis()
}))
app.use(bodyParser({
  extendType: ['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(usersRouter.routes()).use(usersRouter.allowedMethods())
  app.use(geoRouter.routes()).use(geoRouter.allowedMethods())
  app.use(searchRouter.routes()).use(searchRouter.allowedMethods())
  app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods())
  app.use(cartRouter.routes()).use(cartRouter.allowedMethods())
  app.use(orderRouter.routes()).use(orderRouter.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
