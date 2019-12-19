<template>
  <div class="product-category">
    <dl class="select-row">
      <dt class="select-type">分类</dt>
      <dd class="select-item" :class="{active: currentTypeItem === ''}" @click="handleFilterByType('', '')">全部</dd>
      <dd v-for="(item, index) of types" :key="item.type + index" class="select-item" :class="{active: currentTypeItem === item.type}">
        <category-select :name="item.type" :list="item.module" @handleSelect="handleFilterByType" />
      </dd>
    </dl>
    <dl class="select-row">
      <dt class="select-type">区域</dt>
      <dd class="select-item" :class="{active: currentAreaItem === ''}" @click="handleFilterByArea('', '')">全部</dd>
      <dd v-for="(item, index) of areas" :key="item.type + index" class="select-item" :class="{active: currentAreaItem === item.type}">
        <category-select :name="item.type" :list="item.module.slice(0, 50)" @handleSelect="handleFilterByArea" />
      </dd>
    </dl>
  </div>
</template>

<script>
import CategorySelect from '@/components/public/categorySelect.vue'
export default {
  name: 'ProductCategory',
  components: {
    CategorySelect
  },
  props: {
    types: {
      type: Array,
      required: true
    },
    areas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentTypeItem: '',
      currentAreaItem: ''
    }
  },
  methods: {
    handleFilterByType(value, name) {
      this.currentTypeItem = name
      this.$emit('handleFilterProduct', 'type', value)
    },
    handleFilterByArea(value, name) {
      this.currentAreaItem = name
      this.$emit('handleFilterProduct', 'area', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/variables.scss';
  .product-category {
    background-color: #fff;
    padding: 0 20px;
    color: #333;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid $mainBorderColor;
    border-radius: 4px;
    .select-row {
      display: flex;
      border-bottom: 1px solid $mainBorderColor;
      padding: 10px 0;
      &:last-child {
        border-bottom: none;
      }
      .select-type {
        font-weight: 700;
        margin-right: 30px;
        padding: 5px 15px;
      }
      .select-item {
        margin-right: 10px;
        padding: 5px 15px;
        cursor: pointer;
        &.active {
          background-color: $mainBgColor;
          border-radius: 30px;
          font-weight: 500;
          color: #222;
        }
      }
    }
  }
</style>
