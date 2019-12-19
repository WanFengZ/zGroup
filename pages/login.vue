<template>
  <div class="login">
    <header class="header">
      <div class="logo">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </div>
    </header>
    <div class="content clearfix">
      <div class="bill">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
      </div>
      <div class="login">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-form">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码">
            </el-input>
            <p style="text-align: right;margin-top: 6px;position: absolute;right: 0;bottom: -30px">
              <a href="#">
                忘记密码
              </a>
            </p>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
            <el-button type="primary" size="middle" class="login-button" @click="login">
              登录
            </el-button>
            <p style="margin-top: 15px">
              还没有账号？
              <nuxt-link to="/register">
                免费注册
              </nuxt-link>
            </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer class="footer">
      <ul>
        <li><a href="#">关于美团</a></li>
        <li><a href="#">加入我们</a></li>
        <li><a href="#">商家入驻</a></li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">美团手机版</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'foot',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/users/signin', {
            username: encodeURIComponent(this.ruleForm.username),
            password: this.ruleForm.password
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                this.$message.success('登录成功，即将跳转到首页')
                setTimeout(() => {
                  location.href = '/'
                }, 1000)
              } else {
                this.$message.error(data.msg)
              }
            } else {
              this.$message.error(`服务器错误，错误码${status}`)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/public.scss';
  .login {
    width: 980px;
    margin: 0 auto;
    .header {
      height: 120px;
      .logo {
        margin-top: 40px;
        img {
          height: 60px;
        }
      }
    }
    .content {
      border-bottom: 1px solid #eee;
      padding-bottom: 50px;
      .bill {
        float: left;
        width: 480px;
        height: 370px;
        margin-right: 115px;
      }
      .login {
        float: left;
        width: 270px;
        .login-form {
          margin-top: 60px;
          .login-button {
            width: 100%;
          }
        }
      }
    }
    .footer {
      padding: 12px 0;
      ul {
        display: flex;
        justify-content: center;
        li {
          height: 24px;
          line-height: 24px;
          padding: 0 15px;
          a {
            color: #999;
          }
        }
      }
    }
  }
</style>
