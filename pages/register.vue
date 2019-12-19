<template>
  <div class="register">
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
        </div>
        <div class="login">
          <span class="text">已有美团账号？</span>
          <nuxt-link to="/login" class="login-button">
            登 录
          </nuxt-link>
        </div>
      </div>
    </header>
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" size="small" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" size="small" />
          <el-button size="small" round class="code-button" :disabled="disableSendCode" @click="sendRegisterCode">
            发送验证码
          </el-button>
          <span v-text="statusMsg">
          </span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" size="small" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" size="small" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" size="small" />
        </el-form-item>
        <el-form-item style="margin-top: 40px">
          <el-button class="submit-button" @click="register">
            同意以下协议并注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="term">
            <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
            <a class="f1" href="https://rules-center.meituan.com/rules-detail/2" target="_blank">《美团网隐私协议》</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  layout: 'foot',
  data() {
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确邮箱地址', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请创建密码', trigger: 'blur' }
        ],
        cpwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      statusMsg: '',
      disableSendCode: false
    }
  },
  methods: {
    sendRegisterCode() {
      if (this.timeId) {
        return
      }

      let namePass,
        emailPass

      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })

      if (namePass || emailPass) {
        return
      }

      this.$axios.post('/users/verify', {
        username: encodeURIComponent(this.ruleForm.name),
        email: this.ruleForm.email
      }).then(({ status, data }) => {
        if (status === 200 && data && data.code === 0) {
          this.disableSendCode = true
          let count = 180
          this.statusMsg = `验证码已发送，剩余${count--}秒`
          this.timeId = setInterval(() => {
            this.statusMsg = `验证码已发送，剩余${count--}秒`
            if (count === 0) {
              this.disableSendCode = false
              this.statusMsg = ''
              clearInterval(this.timeId)
              this.timeId = null
            }
          }, 1000)
        } else {
          this.statusMsg = data.msg
        }
      })
    },
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/users/signup', {
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email,
            code: this.ruleForm.code,
            password: this.ruleForm.pwd
          }).then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              this.$message.success('恭喜你注册成功，即将跳转到登录界面')
              setTimeout(() => {
                location.href = '/login'
              }, 1500)
            } else {
              this.$message.error('注册失败 ' + data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';

  .register {
    .header {
      height: 60px;
      border-bottom: 1px solid #ccc;
      padding: 12px 0;
      margin-bottom: 40px;
      .header-inner {
        width: 980px;
        margin: 0 auto;
        .logo {
          float: left;
          img {
            height: 36px;
          }
        }
        .login {
          float: right;
          height: 36px;
          .text {
            color: #666;
            line-height: 36px;
          }
          .login-button {
            display: inline-block;
            padding: 3px 10px;
            background-color: $mainBgColor;
            border-radius: 4px;
            color: #222;
            font-size: 12px;
          }
        }
      }
    }
    .content {
      width: 980px;
      margin: 0 auto;
      .el-input {
        width: 260px;
      }
      .code-button {
        &:hover, &:focus {
          color: #222;
          border-color: $mainBgColor;
          background-color: $mainBgColor;
        }
      }
      .submit-button {
        border: none;
        background-color: $mainBgColor;
        color: #222;
        &:hover {
          color: #222;
        }
      }
    }
  }
</style>
