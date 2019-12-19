<template>
  <div class="shop-info">
    <div class="shop-desc">
      <h1>{{ shop.name }}</h1>
      <el-rate
        v-model="shop.rating"
        disabled
        show-score
        text-color="#666"
        score-template="{value}分"
        class="rate-star"
      />
      <span class="price">人均 ¥{{ Number(shop.biz_ext.cost) }}</span>
      <div class="address">
        <p>地址： {{ shop.addr }}</p>
        <p>电话： {{ shop.tel }}</p>
      </div>
    </div>
    <div class="shop-image">
      <image-gallery :images="shop.photos" :bottom-list-item-count="5" />
    </div>
  </div>
</template>

<script>
import ImageGallery from '@/components/public/imageGallery.vue'
export default {
  name: 'ShopInfo',
  components: {
    ImageGallery
  },
  props: {
    shop: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-info {
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 20px 33px;
    margin-top: 10px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
    display: flex;
    .shop-desc {
      flex: 1;
      padding-right: 20px;
      h1 {
        font-size: 26px;
        line-height: 37px;
        margin-bottom: 10px;
      }
      .rate-star {
        display: inline-block;
        vertical-align: middle;
      }
      .address {
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        padding: 20px 0;
        margin-top: 10px;
      }
    }
  }
</style>
