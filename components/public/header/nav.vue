<template>
  <div class="nav">
    <ul class="nav__ul">
      <li class="nav__li has-child">
        <nuxt-link to="/my" class="nav-item__a">
          我的美团
        </nuxt-link>
        <dl class="nav-item__dl">
          <dd><a href="/order">我的订单</a></dd>
          <dd>我的收藏</dd>
          <dd>抵用卷</dd>
          <dd>账户设置</dd>
        </dl>
      </li>
      <li class="nav__li">
        <nuxt-link to="/order" class="nav-item__a">
          手机APP
        </nuxt-link>
      </li>
      <li class="nav__li has-child">
        <nuxt-link to="/center" class="nav-item__a">
          商家中心
        </nuxt-link>
        <dl class="nav-item__dl">
          <dd>登陆商家中心</dd>
          <dd>美团智能收银</dd>
          <dd>我想合作</dd>
          <dd>手机免费开店</dd>
          <dd>餐饮代理商招募</dd>
          <dd>商家申请开票</dd>
          <dd>免费合作美团排队</dd>
        </dl>
      </li>
      <li class="nav__li has-child">
        <nuxt-link to="/site" class="nav-item__a">
          网站导航
        </nuxt-link>
        <div class="nav-item__div">
          <dl class="site-item__dl lvyou">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
            <dd>火车票</dd>
            <dd>榛果民宿</dd>
            <dd>经济型酒店</dd>
            <dd>主题酒店</dd>
            <dd>商务酒店</dd>
            <dd>公寓</dd>
            <dd>豪华酒店</dd>
            <dd>客栈</dd>
            <dd>青年旅社</dd>
            <dd>度假酒店</dd>
            <dd>别墅</dd>
            <dd>农家院</dd>
          </dl>
          <dl class="site-item__dl meishi">
            <dt>吃美食</dt>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烧烤</dd>
            <dd>自助餐</dd>
            <dd>火锅</dd>
            <dd>代金券</dd>
          </dl>
          <dl class="site-item__dl movie">
            <dt>看电影</dt>
            <dd>热映电影</dd>
            <dd>热门影院</dd>
            <dd>热映电影口碑榜</dd>
            <dd>最受期待电影</dd>
            <dd>国内票房榜</dd>
            <dd>北美票房榜</dd>
            <dd>电影排行榜</dd>
          </dl>
          <dl class="site-item__dl app">
            <dt>手机应用</dt>
            <dd>
              <img class="app-icon" src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png" title="美团app" alt="美团app">
            </dd>
            <dd>
              <img class="app-icon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png" title="外卖app" alt="外卖app">
            </dd>
            <dd>
              <img class="app-icon" src="//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png" title="榛果app" alt="榛果app">
            </dd>
            <dd>
              <img class="app-icon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png" title="点评app" alt="点评app">
            </dd>
            <dd>
              <img class="app-icon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png" title="猫眼app" alt="猫眼app">
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';
  .nav {
    height: 100%;
    .nav__ul {
      float: right;
      display: flex;
      .nav__li {
        position: relative;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        .nav-item__a {
          display: block;
          height: $headerBarHeight;
          line-height: $headerBarHeight;
          text-align: center;
          color: #999;
          padding: 0 14px;
          position: relative;
          z-index: 1000;
          &:hover {
            color: #fe8c00;
          }
        }
        .nav-item__dl {
          position: absolute;
          right: -1px;
          top: $headerBarHeight - 1px;
          background-color: #fff;
          border: 1px solid transparent;
          white-space: nowrap;
          display: none;
          z-index: 9;
          dd {
            height: $headerBarHeight;
            line-height: $headerBarHeight;
            text-align: center;
            padding: 0 14px;
            cursor: pointer;
            &:hover {
              color: $mainAColor;
              a {
                color: $mainAColor;
              }
            }
            a {
              color: #999;
            }
          }
        }
        .nav-item__div {
          position: absolute;
          right: -1px;
          top: $headerBarHeight - 2px;
          width: $pageInnerWidth;
          min-height: 100px;
          background-color: #fff;
          border: 1px solid transparent;
          padding: 30px;
          display: none;
          z-index: 999;
          .site-item__dl {
            display: inline-block;
            vertical-align: top;
            &.lvyou {
              width: 234px;
              margin-left: 20px;
              dd {
                float: left;
                width: 33%;
                text-align: center;
              }
            }
            &.meishi {
              width: 156px;
              margin-left: 20px;
              dd {
                float: left;
                width: 50%;
                text-align: center;
              }
            }
            &.movie {
              width: 90px;
              margin-left: 40px;
              dd {
                text-align: center;
              }
            }
            &.app {
              margin-left: 50px;
              dd {
                display: inline-block;
                margin: 0 10px;
                .app-icon {
                  width: 60px;
                  height: 60px;
                }
              }
            }
            dt {
              margin-bottom: 26px;
              font-size: 14px;
              color: #222222;
              font-weight: 500;
              text-align: center;
            }
            dd {
              padding: 5px 0;
              cursor: pointer;
              &:hover {
                color: #fe8c00;
              }
            }
          }
        }
        &.has-child:hover {
          box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
          border-color: #d5d5d5;
          .nav-item__a {
            background-color: #fff;
          }
          .nav-item__dl,
          .nav-item__div {
            display: block;
            border-color: #d5d5d5;
            box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
          }
        }
      }
    }
  }
</style>
