<template>
  <div class="product-list">
    <div class="sort">
      <span :class="{active: currentSort === ''}" @click="handleSort('')">智能排序</span>
      <span :class="{active: currentSort === 'price'}" @click="handleSort('price', !priceOrder)">
        {{ priceSortText }}
        <i class="el-icon-d-caret"></i>
      </span>
      <span :class="{active: currentSort === 'comment'}" @click="handleSort('comment', true)">人气最高</span>
      <span :class="{active: currentSort === 'rate'}" @click="handleSort('rate', true)">评价最高</span>
    </div>
    <ul v-if="products.length > 0" class="card-list">
      <li v-for="(item, index) of products" :key="item.id" class="card-item" @handleToMap="handleToMap">
        <product-card :product="item" :index="index" @handleToMap="handleToMap" />
      </li>
    </ul>
    <div v-else class="no-product">
      暂无搜索结果
    </div>
  </div>
</template>

<script>
import ProductCard from './productCard.vue'
export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSort: '',
      priceOrder: true
    }
  },
  computed: {
    priceSortText() {
      if (this.currentSort === 'price') {
        if (this.priceOrder) {
          return '价格最高'
        } else {
          return '价格最低'
        }
      } else {
        return '价格排序'
      }
    }
  },
  methods: {
    handleToMap(location) {
      this.$emit('handleToMap', location)
    },
    handleSort(mode, option) {
      if (mode === 'price') {
        this.priceOrder = !this.priceOrder
      }
      this.currentSort = mode
      this.$emit('handleSort', mode, option)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';
  .product-list {
    padding: 15px 20px;
    background-color: #fff;
    border: 1px solid $mainBorderColor;
    border-radius: 4px;
    .sort {
      span {
        padding: 0 10px;
        color: #666;
        font-size: 14px;
        line-height: 40px;
        cursor: pointer;
        &.active {
          color: #222;
          font-weight: 700;
        }
      }
    }
    .card-list {
      width: 100%;
      .card-item {
        border-top: 1px solid $mainBorderColor;
      }
    }
    .no-product {
      font-size: 18px;
      color: #666;
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
