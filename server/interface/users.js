import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMail from 'nodemailer'
import User from '../dbs/models/user'
import dbConfig from '../dbs/config'
import axios from './utils/axios'
import Passport from './utils/passport'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已失效，请重新尝试'
        }
        return
      }

      const user = await User.find({ username })
      if (user.length) {
        ctx.body = {
          code: -1,
          msg: '该用户已被注册'
        }
        return
      }
      const newUser = await User.create({
        username,
        password,
        email
      })

      if (newUser) {
        const res = await axios.post('/users/signin', {
          username,
          password
        })

        if (res.data && res.data.code === 0) {
          ctx.body = {
            code: 0,
            msg: '注册成功',
            user: res.data.user
          }
        } else {
          ctx.body = {
            code: -1,
            msg: 'error'
          }
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '注册失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
})

router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功'
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  const { username, email } = ctx.request.body

  const savaExpire = await Store.hget(`nodemail:${username}`, 'expire')

  if (savaExpire && new Date().getTime() - savaExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，三分钟内限制请求一次'
    }
    return
  }

  const transporter = nodeMail.createTransport({
    host: dbConfig.smtp.host,
    port: dbConfig.smtp.port,
    secure: false,
    auth: {
      user: dbConfig.smtp.user,
      pass: dbConfig.smtp.pass
    }
  })

  const temp = {
    code: dbConfig.smtp.code(),
    expire: dbConfig.smtp.expire(),
    username,
    email
  }

  const mailOption = {
    from: `"认证邮件" <${dbConfig.smtp.user}>`,
    to: temp.email,
    subject: "WanFengZ's 毕业设计注册验证码",
    html: `您的验证码是${temp.code}`
  }

  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('smtp 发送失败')
      ctx.body = {
        code: -1,
        msg: '验证邮件发送失败'
      }
    } else {
      Store.hset(`nodemail:${temp.username}`, 'code', temp.code)
      Store.hset(`nodemail:${temp.username}`, 'expire', temp.expire)
      Store.hset(`nodemail:${temp.username}`, 'email', temp.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效期三分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      username,
      email
    }
  } else {
    ctx.body = {
      code: '-1'
    }
  }
})

export default router
