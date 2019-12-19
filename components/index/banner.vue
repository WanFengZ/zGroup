<template>
  <div class="banner">
    <div class="nav">
      <a href="#" class="takeout">美团外卖</a>
      <a href="#" class="movie">猫眼电影</a>
      <a href="#" class="hotel">美团酒店</a>
      <a href="#" class="apartment">名宿/公寓</a>
      <a href="#" class="merchant">商家入驻</a>
      <a href="#" class="community">美团公益</a>
    </div>
    <div class="banner-row" style="height: 240px">
      <div class="left-col">
        <el-carousel :interval="3000" height="240px">
          <el-carousel-item v-for="(url, index) in bannerItems" :key="index">
            <img :src="url" alt="" height="100%" width="100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="center-col">
        <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt="" width="100%" height="100%">
      </div>
      <div class="right-col">
        <div v-if="!$store.state.user.user" class="no-login">
          <p>Hi，你好</p>
          <nuxt-link to="/login">登录</nuxt-link>
          <nuxt-link to="/register">注册</nuxt-link>
        </div>
        <div v-else class="logined">
          <p>Hi，你好, {{ $store.state.user.user.username }}</p>
          <nuxt-link to="/order">订单中心</nuxt-link>
        </div>
      </div>
    </div>
    <div class="banner-row" style="height: 177px;margin-top: 10px">
      <div class="left-col">
        <div class="left-item">
          <img src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png" alt="" width="100%" height="100%">
        </div>
        <div class="right-item">
          <img src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt="" width="100%" height="100%">
        </div>
      </div>
      <div class="center-col">
        <img src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt="" width="100%" height="100%">
      </div>
      <div class="right-col">
        <div class="qrcode-box">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
        </div>
        <p class="app-name">
          美团APP手机版
        </p>
        <p class="sl">
          <span class="red">
            1元起</span>
          <span class="gary">
            吃喝玩乐
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      bannerItems: [
        'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
        'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
        'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    .nav {
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
      a {
        padding: 0 20px;
        color: #222;
        font-size: 16px;
        font-weight: 700;
        &.takeout:hover {
          color: #fbc700;
        }
        &.movie:hover {
          color: #ed1e24;
        }
        &.hotel:hover {
          color: #f04d4e;
        }
        &.apartment:hover {
          color: #fdc411;
        }
        &.merchant:hover {
          color: #fe8c00;
        }
        &.community:hover {
          color: #f04d4e;
        }
      }
    }
    .banner-row {
      display: flex;
      .left-col {
        width: 550px;
        font-size: 0;
        .left-item,
        .right-item {
          display: inline-block;
          width: 270px;
          height: 100%;
        }
        .left-item {
          margin-right: 10px;
        }
      }
      .center-col {
        margin: 0 10px;
        width: 150px;
      }
      .right-col {
        width: 234px;
        background-color: #fff;
        text-align: center;
        .logined, .no-login {
          margin-top: 30px;
          p {
            font-size: 16px;
            color: #222;
            text-align: center;
            font-weight: 500;
            margin-bottom: 30px;
          }
          a {
            display: block;
            width: 118px;
            text-align: center;
            margin: 10px auto 15px auto;
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 40px;
            font-size: 14px;
            color: #333;
            line-height: 38px;
          }
        }
        .qrcode-box {
          margin-top: 15px;
          img {
            width: 95px;
            height: 95px;
          }
        }
        .app-name {
          font-size: 16px;
          color: #222222;
          font-weight: 500;
        }
        .sl {
          font-size: 12px;
          font-weight: 500;
          margin-top: 2px;
          .red {
            color: #EC5330;
            margin-right: 5px;
          }
          .grey {
            color: #3f3f3f;
          }
        }
      }
    }
  }
</style>
