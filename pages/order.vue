<template>
  <div class="order">
    <div class="left-bar">
      <dl>
        <dt>我的订单</dt>
        <dd v-for="item of menu" :key="item.tab" @click="handleTabClick(item.status)">
          {{ item.tab }}
          <span class="icon el-icon-arrow-right"></span>
        </dd>
      </dl>
    </div>
    <div class="right-tab">
      <ul class="tab-bar clearfix">
        <li v-for="item of menu" :key="item.tab" class="tab-item" :class="{active: currentOrderType === item.status}" @click="handleTabClick(item.status)">
          {{ item.tab }}
        </li>
      </ul>
      <div class="tab-content">
        <ul v-if="currentOrders.length > 0">
          <li v-for="item of currentOrders" :key="item.id" class="order-item">
            <div class="goods-img">
              <img :src="item.detail.imgs[0].url" alt="">
            </div>
            <div class="goods-info">
              <p class="goods-name">{{ item.detail.name }}</p>
              <p class="goods-count">数量：{{ item.detail.count }}</p>
            </div>
            <div class="order-total">
              总价：¥ {{ item.total }}
            </div>
            <div class="order-status">
              <el-button v-if="item.status === 0" class="pay-button">去支付</el-button>
            </div>
          </li>
        </ul>
        <p v-else class="no-order">对不起，没有对应的订单</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { tab: '全部订单', status: -1 },
        { tab: '待付款', status: 0 },
        { tab: '待使用', status: 1 },
        { tab: '待评价', status: 2 },
        { tab: '退款/售后', status: 3 }
      ],
      currentOrderType: -1,
      orders: []
    }
  },
  computed: {
    currentOrders() {
      return this.currentOrderType === -1 ? this.orders : this.orders.filter(item => item.status === this.currentOrderType)
    }
  },
  async asyncData(ctx) {
    const { status, data: { code, orders } } = await ctx.$axios.post('/order/getOrder')
    if (status === 200 && code === 0) {
      return {
        orders
      }
    }
  },
  methods: {
    handleTabClick(type) {
      this.currentOrderType = type
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  @import '~@/assets/css/public.scss';
  .order {
    padding-top: 40px;
    display: flex;
    @include page-center;
    .left-bar {
      padding: 0 20px 30px;
      width: 230px;
      margin-right: 10px;
      background: #fff;
      border: 1px solid $mainBorderColor;
      border-radius: 4px;
      dl {
        margin-top: 30px;
      }
      dt {
        font-size: 16px;
        color: #222222;
        font-weight: 500;
      }
      dd {
        font-size: 14px;
        color: #666;
        line-height: 20px;
        margin-top: 15px;
        cursor: pointer;
        .icon {
          float: right;
          line-height: 20px;
        }
      }
    }
    .right-tab {
      flex: 1;
      background-color: #fff;
      border: 1px solid $mainBorderColor;
      padding: 20px;
      .tab-bar {
        border-bottom: 1px solid $mainBorderColor;
        .tab-item {
          float: left;
          width: 105px;
          height: 38px;
          margin-right: 25px;
          font-size: 20px;
          color: #222;
          text-align: center;
          font-weight: 500;
          cursor: pointer;
          &.active {
            border-bottom: 2px solid $mainBgColor;
          }
        }
      }
      .tab-content {
        .no-order {
          border-top: 1px solid #E5E5E5;
          padding: 40px 0;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .order-item {
          padding: 20px 0;
          display: flex;
          .goods-img {
            width: 90px;
            height: 90px;
            border-radius: 4px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods-info {
            max-width: 325px;
            min-width: 250px;
            padding-left: 20px;
            padding-top: 15px;
            .goods-name {
              font-size: 16px;
              color: #222222;
              font-weight: 500;
              @include ellipsis;
            }
            .goods-count {
              font-size: 12px;
              color: #666666;
            }
          }
        }
        .order-total {
          width: 200px;
          line-height: 90px;
          font-size: 14px;
          color: #666;
          text-align: center;
        }
        .order-status {
          .pay-button {
            margin-top: 25px;
          }
        }
      }
    }
  }
</style>
