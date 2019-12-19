<template>
  <div class="goods">
    <h3>商家团购及优惠</h3>
    <div class="goods-box">
      <div v-if="login" class="goods-list">
        <ul v-if="list.length > 0">
          <li class="goods-count">共{{ list.length }}款套餐</li>
          <li v-for="(item, index) of list" :key="index" class="goods-item">
            <div class="goods-image">
              <img :src="item.photos[0].url" alt="">
            </div>
            <div class="goods-detail">
              <h4 class="name">
                {{ item.name }}
                <img src="https://p1.meituan.net/codeman/31eac2c905f5be14ce80654d9508e720832.png">
              </h4>
              <p class="sale-count">
                已售{{ Math.round(Math.random() * 1000) }}
              </p>
              <p class="price">
                <b>¥</b>
                <span>{{ Number(item.biz_ext.cost) }}</span>
                <sub>门店价 ¥{{ Number(item.biz_ext.cost) }}</sub>
              </p>
              <el-button type="warning" round class="buy" @click="handleAddCart(item)">
                立即抢购
              </el-button>
            </div>
          </li>
        </ul>
        <div v-else class="no-goods">暂无商品</div>
      </div>
      <div v-else class="no-login"><a href="/login">去登录</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    list: {
      type: Array,
      required: true
    },
    login: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async handleAddCart(goods) {
      const { status, data: { code, id } } = await this.$axios.post('/cart/createCart', {
        goodsId: Math.random().toString().slice(3, 9),
        goodsDetail: {
          name: goods.name,
          imgs: goods.photos,
          price: Number(goods.biz_ext.cost)
        }
      })

      if (status === 200 && code === 0) {
        window.location.href = `/cart?id=${id}`
      } else {
        this.$message.error('error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";
  .goods {
    width: 870px;
    margin-top: 40px;
    h3 {
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 8px;
      color: #222;
      font-weight: 700;
    }
    .goods-box {
      padding: 16px 20px 20px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      .no-login {
        padding: 20px 0;
        text-align: center;
      }
      .goods-list {
        .no-goods {
          padding: 20px 0;
          text-align: center;
        }
        .goods-count {
          font-size: 16px;
          line-height: 26px;
          font-weight: 500;
        }
        .goods-item {
          display: flex;
          padding-bottom: 20px;
          margin-top: 17px;
          .goods-image {
            width: 100px;
            height: 100px;
            border-radius: 4px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100px;
            }
          }
          .goods-detail {
            flex: 1;
            padding-left: 20px;
            position: relative;
            .name {
              font-size: 17px;
              line-height: 22px;
              color: #222;
              img {
                vertical-align: middle;
                font-size: 12px;
                color: #fff;
                height: 17px;
                width: 17px;
                margin-left: 10px;
              }
            }
            .sale-count {
              font-size: 12px;
              color: #666;
              line-height: 17px;
              margin: 4px 0 12px;
            }
            .price {
              font-size: 30px;
              color: #f60;
              b {
                font-weight: 400;
                font-size: 14px;
              }
              span {
              }
              sub {
                color: #999;
                font-size: 12px;
                margin-left: 10px;
                vertical-align: baseline;
              }
            }
            .buy {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
              background-color: $mainAColor;
              border: none;
            }
          }
        }
      }
    }
  }
</style>
