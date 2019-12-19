<template>
  <div class="product-detail">
    <el-row>
      <el-col>
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <shop-info :shop="product" />
      </el-col>
    </el-row>
    <el-row>
      <el-col style="display: flex">
        <goods :list="list" :login="login" />
        <amap :pois="product.location.split(',')" :center="product.location.split(',')" class="map" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import ShopInfo from '@/components/detail/shopInfo.vue'
import Goods from '@/components/detail/goods.vue'
import Amap from '@/components/public/amap.vue'
import { formatProductAddress } from '@/assets/js/utils'
export default {
  components: {
    Crumbs,
    ShopInfo,
    Goods,
    Amap
  },
  async asyncData(ctx) {
    const { keyword, type } = ctx.query
    const { status, data: { product, more: list, login } } = await ctx.$axios.get('/search/product', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      product.rating = Number(product.biz_ext.rating)
      product.addr = formatProductAddress(product)
      return {
        keyword,
        type,
        product,
        list: list.filter(item => item.photos.length),
        login
      }
    } else {
      return {
        keyword,
        type,
        product: {},
        list: [],
        login: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixins.scss';
  .product-detail {
    padding-top: 10px;
    @include page-center;
    .map {
      margin-top: 80px;
      margin-left: 20px;
    }
  }
</style>
