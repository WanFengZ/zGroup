<template>
  <div :id="product.id" class="product">
    <div class="product-img">
      <img :src="product.img" alt="">
      <span>{{ index + 1 }}</span>
    </div>
    <div class="product-detail">
      <h3 class="name"><nuxt-link :to="{path: 'detail', query: { keyword: product.name, type: product.module }}">{{ product.name }}</nuxt-link></h3>
      <el-rate
        v-model="product.rate"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}分"
        class="rate-star"
      >
      </el-rate>
      <span v-if="product.rate > 4" class="rate-desc">很好</span>
      <span v-else-if="product.rate > 3" class="rate-desc">一般</span>
      <span v-else class="rate-desc">很差</span>
      <span class="comment-total">{{ product.comment }}人评论</span>
      <p style="margin-top: 6px">
        <span class="type">{{ product.type }}</span>
        <span class="addr">{{ product.addr }}</span>
        <span class="to-map" @click="handleToMap(product.location)">查看地图</span>
      </p>
      <p style="margin-top: 6px">
        <em class="price">￥{{ product.price }}起</em>
        <b class="status">{{ product.status }}</b>
      </p>
      <ul class="type-list">
        <li v-if="product.scene && product.scene.length">
          <span class="detail-type">详情</span>
          {{ product.scene }}
        </li>
        <li v-else>
          <span class="detail-type">详情</span>暂无描述
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleToMap(location) {
      this.$emit('handleToMap', location)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  @import '~@/assets/css/variables.scss';
  .product {
    padding: 20px 0 16px;
    display: flex;
    .product-img {
      width: 220px;
      margin-right: 25px;
      position: relative;
      img {
        width: 220px;
      }
      span {
        position: absolute;
        left: -3px;
        top: 3px;
        width: 24px;
        height: 14px;
        line-height: 14px;
        background: #FB6433;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
    }
    .product-detail {
      flex: 1;
      font-size: 12px;
      color: #666;
      .name {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 6px;
        a {
          color: #333;
        }
      }
      .rate-star {
        display: inline-block;
        vertical-align: top;
      }
      .rate-desc {
        padding-left: 20px;
      }
      .comment-total {
        padding-left: 20px;
        color: #FF9900;
      }
      .type {
        display: inline-block;
        vertical-align: middle;
        width: 130px;
        @include ellipsis;
      }
      .addr {
        display: inline-block;
        vertical-align: middle;
        width: 310px;
        padding-left: 20px;
        @include ellipsis;
      }
      .to-map {
        font-weight: 500;
        color: #222222;
        cursor: pointer;
        margin-left: 10px;
      }
      .price {
        color: #ff6600;
        font-size: 18px;
      }
      .status {
        margin-left: 10px;
        display: inline-block;
        vertical-align: center;
        line-height: 24px;
        padding: 0 10px;
        color: #FF9900;
      }
      .type-list {
        margin-top: 20px;
        border-top: 1px dashed $mainBorderColor;
        padding: 15px 0;
        li {
          width: 540px;
          @include ellipsis;
          .detail-type {
            width: 27px;
            height: 15px;
            line-height: 15px;
            display: inline-block;
            background: rgb(35, 147, 238);
            color: #fff;
            text-align: center;
            border-radius: 1px;
            padding: 1px 2px;
            margin-right: 10px;
          }
          &:nth-child(2) {
            .detail-type {
              background: rgb(162, 35, 204);
            }
          }
          &:nth-child(3) {
            .detail-type {
              background: rgb(234, 109, 45);
            }
          }
        }
      }
    }
  }
</style>
