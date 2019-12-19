<template>
  <div class="hot-city">
    <dl @click="handleClick">
      <dt>热门城市：</dt>
      <dd v-for="item of $store.state.geo.hotCity" :key="item.id" :province="item.province" :city="getCity(item)">
        {{ getCity(item) }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'HotCity',
  methods: {
    getCity(item) {
      return item.name === '市辖区' || item.name === '省直辖县级行政规划' ? item.province : item.name
    },
    handleClick(e) {
      const dom = e.target
      if (dom.tagName.toLowerCase() === 'dd') {
        const position = dom.getAttribute('province') + ',' + dom.getAttribute('city')
        this.$emit('changeCity', position)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .hot-city {
    padding: 30px 0;
    dl {
      display: flex;
      dt {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
      dd {
        margin: 0 20px;
        color: #666;
        line-height: 22px;
        cursor: pointer;
        &:hover {
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
</style>
